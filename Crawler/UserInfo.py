import requests
from bs4 import BeautifulSoup
import inspect
from urllib.request import urlopen
from urllib.request import Request
import SendingEmail 
# import schedule
import boto3
import time
import traceback
import datetime
from boto3.dynamodb.conditions import Key, Attr

user_list = []


class UserInfo(): #user마다의 아이디 이메일 이름등을 관리하는 클래스
    def __init__(self, email, id, name, alarmTime):
        self.email = email
        self.id = id
        self.name = name
        self.alarmTime = alarmTime
        self.keyword = []

    #get은 각각의 멤버변수에 대한 접근을 할 수 있는 함수
    def get_email(self):
        return self.email

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name
    
    def get_alarmTime(self):
        return self.alarmTime
    
    def get_keyword(self):
        return self.keyword
    
    #user마다 가지고있는 keyword를 추가하는 함수
    def add_keyword(self, keyword):
        self.keyword.append(keyword)

    def get_user_list():
        return UserInfo.user_list


#디비에서 모든 유저들을 불러오는 함수
def all_userId_get():
    session = boto3.Session(profile_name='bns')
    dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
    user_table = dynamodb.Table('User-iwrkzo6ufzfpxidyj5nch7lk5a-dev')

#id존재하는 모든 값을 가져옴
    response = user_table.scan (
        FilterExpression = Attr('id').exists()
    )

    for item in response['Items']:#user_list에 user를 추가.
        user_list.append(UserInfo(item['email'], item['id'], item['name'], item['alarmTime']))

def userKeyword():#
    global user_list
    
    # for user in user_list:
    #     print(user.get_email())

    session = boto3.Session(profile_name='bns')
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

    for user in user_list:#각 user가 선택한 keyword를 userInfo 클래스에 저장해주기 위해서 2중 for문으로 체크하기.
        id = user.get_id()
        email = user.get_email()
        
        for userkeyword in userkeyword_list:

            if userkeyword['userId'] == id:
                user.add_keyword( keyword_list[ int(userkeyword['keywordId']) - 1 ] )


    #user_list돌면서 각 user가 가지고 있는 keyword 하기
    for user in user_list:
        print(user.keyword)





#실행할때 두가지 함수실행

#user를 user_list에저장
all_userId_get()
#user_list 돌면서 각 user마다 keyword를 추가.
userKeyword()
