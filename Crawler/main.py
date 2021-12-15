import Crawler
import boto3
from boto3.dynamodb.conditions import Key, Attr
import string
import random
import schedule
import computerSoftware
import Engineering
import softwareCenter
import time

import SendingEmailController

def test1():
    print('test1')
def test2():
    print('test2')
def main():
    #Notification crawling
    #information class를 저장하는 변수

    # 매주 월요일 실행
    # schedule.every().day.at("10:00").do(computerSoftware())
    
    # 10초에 한번씩 실행
    # schedule.every(10).second.do(job)
    # # 10분에 한번씩 실행
    # schedule.every(10).minutes.do(job)
    # # 매 시간 실행
    # schedule.every().hour.do(job)
    
    # # 매주 월요일 실행
    # schedule.every().monday.do(job)
    # # 매주 수요일 13:15 에 실행
    # schedule.every().wednesday.at("13:15").do(job)

    # schedule.every(30).seconds.do(test1)

    # schedule.every(35).seconds.do(test2)

    # schedule.every().day.at("07:00").do(computerSoftware.computerSoftware)
    # schedule.every().day.at("07:00").do(Engineering.Engineering)
    # schedule.every().day.at("07:00").do(softwareCenter.softwareCenter)

    ec = SendingEmailController.EmailController()
    ec.run()


    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

    crawler = Crawler.Crawler()
    info = []
    info1 = crawler.getData1()
    info.append(info1)

    # info2 = crawler.getData2()
    # info.append(info2)
    # info3 = crawler.getData3()
    # info.append(info3)

    # info 값 debugging 용도
    # debugging_info(info)

    # put_noti(info)
    # put_NotiKeyword()
def put_noti(info):
    # 크롤링한 내용 Database에  넣는 작업
    session = boto3.Session(profile_name='bns')
    dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
    table = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
    
    noti_db = table.scan()
    noti_list = noti_db['Items']
    noti_list = sorted(noti_list, key=lambda x: -int(x["id"]))
    if noti_db['Count'] == 0:
        cnt = 1
    else:
        cnt = int(noti_list[0]['id']) + 1

    try:
        print('PUT_ITEM')
        for i in range(0, len(info)):
            for j in range(0, len(info[i].hypertitle)):
                # print(cnt)
                table.put_item(
                    Item={
                            'id': str(cnt),
                            'link': info[i].hypertitle[j],
                            'name': info[i].title[j],
                            'orgId' : str(info[i].organization),
                            'date' : info[i].date[j].strftime("%Y-%m-%d")
                        }
                    )
                cnt += 1
    except Exception as e:
        print('Exception : ', e)


def put_NotiKeyword(): #현재 디비에 있는 정보를 바탕으로 분류함. key값에 대해 문제가 생길듯. 
    session = boto3.Session(profile_name='bns')
    dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
    notiTable = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
    keywordTable = dynamodb.Table('Keyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
    noti_key_Table = dynamodb.Table('NotiKeyword-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
    
    keyword_list = []
    notification_list = []

    response = keywordTable.scan (
        FilterExpression = Attr('id').exists()
    ) 

    for item in response['Items']:
        # print(item['name'])
        keyword_list.append(item)
        # print(item)

    response = notiTable.scan (
        FilterExpression = Attr('id').exists()
    )

    for item in response['Items']:
        # print(item['name'])
        # print(item['link'])
        # print(item['id'])
        notification_list.append(item)
    
    notikey_db = noti_key_Table.scan()
    notikey_list = notikey_db['Items']
    notikey_list = sorted(notikey_list, key=lambda x: -int(x["id"]))

    if notikey_db['Count'] == 0:
        cnt = 1
    else:
        cnt = int(notikey_list[0]['id']) + 1
    
    try:
        print('PUT_NOTIKEYWORD_ITEM')
        for i in range(0, len(notification_list)):
            for j in range(0, len(keyword_list)):
                if keyword_list[j]['name'] in notification_list[i]['name']:
                    title =  notification_list[i]['name']
                    key = keyword_list[j]['name']

                    res = f'{key} : {title}'
                    print(res)
                    noti_key_Table.put_item(
                        Item={
                                'id': str(cnt),
                                'keywordId': keyword_list[j]['id'],
                                'notiId': notification_list[i]['id'],
                            }
                    )
                    cnt += 1
    except Exception as e:
        print('Exception : ', e)

def debugging_info(info):
    for i in range(0, len(info)):
        for j in range(0, len(info[i].hypertitle)):
            print('info.hyperlink : %s'%(info[i].hypertitle[j]))
            print('info.title : %s'%(info[i].title[j]))
            print('organization : %d'%(info[i].organization))
            print('date: %s'%(info[i].date[j]))


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))

if __name__ == "__main__":
    main()