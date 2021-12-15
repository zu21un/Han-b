import boto3
from boto3.dynamodb.conditions import Key, Attr

import UserInfo
from SendingEmail import Email
import datetime

class EmailController:
    def __init__(self):
        self.noti_list = []
        self.notikey_list = []


    def send_mail_control(self):
        user_list = UserInfo.get_user_list() # 임의의 함수 이름 지정해놓은 것
        for user in user_list:
            email = user.get_user_email()
            keylist = user.get_keyword_list()

            notilist = self.get_noti_list(keylist)
            Email.send_mail(text,email)

    # db에서 오늘 날짜 공지를 가져와 noti_list 멤버 변수에 저장
    def set_noti_list(self):
        session = boto3.Session(profile_name='bns')
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
        session = boto3.Session(profile_name='bns')
        dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
        noti_key_Table = dynamodb.Table('NotiKeyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

        notikey_db = noti_key_Table.scan()
        notikey_list = notikey_db['Items']
        self.notikey_list = notikey_list
        
    # keylist에 있는 key를 포함한 오늘 공지들을 return
    def get_noti_list(self, key_id_list):
        my_noti_list = []

        my_notikey_list = filter(lambda x: x['keywordId'] in key_id_list, self.notikey_list)
        for notikey in my_notikey_list:
            my_noti = filter(lambda x: x['id'] == notikey['keywordId'],self.noti_list)
            my_noti_list.apppend(my_noti)


