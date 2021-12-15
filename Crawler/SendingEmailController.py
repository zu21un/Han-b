import boto3
from boto3.dynamodb.conditions import Key, Attr

import UserInfo
from SendingEmail import Email
import datetime
from aws_setting import AMAZON_PROFILE

class EmailController():
    def __init__(self):
        self.noti_list = []
        self.notikey_list = []
        self.user_list = []

    def run(self):
        print("run start")
        self.set_user_list()
        self.set_user_list_keyword()
        self.set_noti_list()
        self.set_notikey_list()
        self.send_to_user()
        print("run finish")


    def send_to_user(self):
        for user in self.user_list:
            email = user.get_email()
            keyword = user.get_keyword()
  
            key_id_list = []
            for key in keyword:
                key_id_list.append(key['id'])
            # print(key_id_list)
            all_notilist = self.get_noti_list(key_id_list)
            today_notilist = []
            for notice in self.noti_list:
                if notice['id'] in all_notilist:
                    today_notilist.append(notice)
            print("today_notilist")
            print(today_notilist)
            payload = today_notilist # 메일 내용 형식으로 추후 수정해야함
            if payload: 
                Email.send_mail(payload,email)

    # db에서 오늘 날짜 공지를 가져와 noti_list 멤버 변수에 저장
    def set_noti_list(self):
        session = boto3.Session(profile_name=AMAZON_PROFILE)
        dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
        table = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

        # 오늘 날짜
        now = datetime.datetime.now()
        nowDate = now.strftime('%Y-%m-%d')

        # db 스캔 후 오늘 날짜의 공지만 filter
        noti_db = table.scan()
        noti_list = noti_db['Items']
        noti_list = filter(lambda x: x['date'] == nowDate, noti_list)
        self.noti_list = noti_list

    # notikeyword list 오늘 날짜의 공지 가져와 notikey_list 멤버 변수에 저장
    def set_notikey_list(self):
        session = boto3.Session(profile_name=AMAZON_PROFILE)
        dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
        noti_key_Table = dynamodb.Table('NotiKeyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

        notikey_db = noti_key_Table.scan()
        notikey_list = notikey_db['Items']
        self.notikey_list = notikey_list
        
    # keylist에 있는 key를 포함한 오늘 공지들을 return
    def get_noti_list(self, key_id_list):
        my_noti_list = []
        # print("get_noti_list start")
        for notikey in self.notikey_list:
            if notikey['keywordId'] in key_id_list:
                my_noti_list.append(notikey['notiId'])
        my_noti_list = list(set(my_noti_list))

        return my_noti_list

    # 전체 user list를 setting
    def set_user_list(self):
        session = boto3.Session(profile_name=AMAZON_PROFILE)
        dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
        user_table = dynamodb.Table('User-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

        #id존재하는 모든 값을 가져옴
        response = user_table.scan (
            FilterExpression = Attr('id').exists()
        )
        # print(response)
        for item in response['Items']:#user_list에 user를 추가.
            self.user_list.append(UserInfo.UserInfo(item['email'], item['id'], item['name'], item['alarmTime']))

        # print(self.user_list)

    # user list 에 있는 user들의 keyword를 setting
    def set_user_list_keyword(self):
        session = boto3.Session(profile_name=AMAZON_PROFILE)
        dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
        userkeyword_table = dynamodb.Table('UserKeyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
        keyword_table = dynamodb.Table('Keyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

        userkeyword_response = userkeyword_table.scan (
            FilterExpression = Attr('id').exists()
        )
        
        keyword_response = keyword_table.scan (
            FilterExpression = Attr('id').exists()
        )
        userkeyword_list = userkeyword_response['Items']

        #keyword_list를 정렬해서 가지고있음 (1번 장학, 2번 인턴, 3번 행사 이런식 )
        keyword_list = keyword_response['Items']
        keyword_list = sorted(keyword_list, key=lambda x: int(x["id"]))

        # for item in userkeyword_list:
        #     print(item)

        for user in self.user_list:#각 user가 선택한 keyword를 userInfo 클래스에 저장해주기 위해서 2중 for문으로 체크하기.
            id = user.get_id()
            email = user.get_email()
            
            for userkeyword in userkeyword_list:

                if userkeyword['userId'] == id:
                    user.add_keyword( keyword_list[ int(userkeyword['keywordId']) - 1 ] )

        #user_list돌면서 각 user가 가지고 있는 keyword 하기
        # for user in self.user_list:
            # print(user.keyword)