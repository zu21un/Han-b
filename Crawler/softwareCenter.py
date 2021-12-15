
from urllib.request import urlopen
from urllib.request import Request
from boto3.dynamodb.conditions import Key, Attr
from bs4 import BeautifulSoup
import os
import os.path 
import boto3
import datetime
import Crawler
from aws_setting import AMAZON_PROFILE
def put_noti(info):
    # 크롤링한 내용 Database에  넣는 작업
    session = boto3.Session(profile_name=AMAZON_PROFILE)
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
        noti_list = []
        for i in range(0, len(info)):
            for j in range(0, len(info[i].hypertitle)):
                item = {'id': str(cnt),'link': info[i].hypertitle[j],'name': info[i].title[j],'orgId' : str(info[i].organization),'date' : info[i].date[j].strftime("%Y-%m-%d")}
                table.put_item(
                    Item=item
                    )
                noti_list.append(item)
                cnt += 1

        put_NotiKeyword(session, dynamodb, noti_list)
    except Exception as e:
        print('Exception : ', e)


def put_NotiKeyword(session, dynamodb, noti_list): #현재 디비에 있는 정보를 바탕으로 분류함. key값에 대해 문제가 생길듯. 

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

    # response = notiTable.scan (
    #     FilterExpression = Attr('id').exists()
    # )

    # for item in response['Items']:
    #     notification_list.append(item)
    
    notification_list = noti_list

    keyword_list = sorted(keyword_list, key=lambda x: -int(x["id"]))
    
    for item in notification_list:
        print(item)
    print
    print
    for item in keyword_list:
        print(item)
    print

    notikey_db = noti_key_Table.scan()
    notikey_list = notikey_db['Items']
    notikey_list = sorted(notikey_list, key=lambda x: -int(x["id"]))

    if notikey_db['Count'] == 0:
        cnt = 1
    else:
        cnt = len(notikey_list) + 1

# notification_list, keyword_list, notikey_list
    try:
        print('PUT_NOTIKEYWORD_ITEM')

        for noti in notification_list:
            for keyword in keyword_list:
                if keyword['name'] in noti['name']:
                    noti_key_Table.put_item(
                        Item = {
                                'id': str(cnt),
                                'keywordId': keyword['id'],
                                'notiId': noti['id'],
                            }
                    )
                    cnt += 1



    except Exception as e:
        print('Exception : ', e)

def softwareCenter():
    req = Request("http://hysoft.hanyang.ac.kr/modules/board/bd_list.html?id=wt_notice")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
    req.add_header("Accept-Language", "ko-KR,ko;")

        
    response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    data = soup.select('.alLeft')
    data_date = soup.select('#subContainer > div.m00.m11 > div > div.con > form:nth-child(2) > table > tbody > tr > td:nth-child(4)')

    #head태그의 link에 접근해 한양대학교 컴퓨터소프트웨어학부의 처음 url을 가져옴
    headInlink = soup.find('head').find('link')
    link = headInlink['href'] + 'modules/board/'
    print(link)


    title = []
    for i in range(0, len(data) ):
        title.append(data[i].get_text().strip())

    hyperTitle = []
    for i in range(0, len(data)):
        hyperTitle.append((link + data[i].find('a')['href']).strip())

    date = []
    for i in range(0, len(data_date)):
        list = (data_date[i].get_text().strip()).split('.')
        
        d = datetime.datetime( int( list[0]) , int(list[1]) , int(list[2]) )
        date.append( d )
    

    # for item in title:
    #     print(item)
        

    #subContainer > div.m00.m11 > div > div.con > form:nth-child(2) > table > tbody > tr > td:nth-child(1)

    #subContainer > div.m00.m11 > div > div.con > form:nth-child(2) > table > tbody > tr:nth-child(14) > td:nth-child(1)


    num_data = soup.select('#subContainer > div.m00.m11 > div > div.con > form:nth-child(2) > table > tbody > tr > td:nth-child(1)') #번호
    # for i in range(0, len(num_data)):
    #     if not num_data[i].get_text().strip() == '':
    #         print(num_data[i].get_text().strip())
            

    file = './소프트웨어중심대학.txt' 
    filter_title = []
    filter_hyperTitle = []
    filter_date = []
    i = 0
    while 1:
        if not '' == num_data[i].get_text().strip():# 새로올라온 공지라고 체크해야함.
            if os.path.isfile(file):#파일이 존재하면 비교해서 새로운 공지가 올라왔는지 판단.
                print("파일이 존재합니다.")
                
                f = open(file,'r',encoding='utf-8')

                text = f.readlines()
                list = text[0].split('~:')
                print(list[0] +' ' +list[1])
                if(list[0] == num_data[i].get_text().strip() and list[1] == title[i]):#같으면 할필요없음.
                    print('새로운 공지 올라오지 않았습니다.')
                else:#같지 않으면 새로운 공지가 올라왔다는 소리.
                    session = boto3.Session(profile_name=AMAZON_PROFILE)
                    dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
                    notiTable = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
                    j = i
                    while 1:
                        if j >= len(num_data):
                            break
                        if not list[0] in num_data[j].get_text().strip():#새로운 공지 올라왔으니 이전공지까지 데이터를 넣어주려고함.
                            filter_date.append(date[j])
                            filter_title.append(title[j])
                            filter_hyperTitle.append(hyperTitle[j])
                            #여기에 올려주면됨
                            print( num_data[j].get_text().strip() + ' ' + title[j] )

                        else : 
                            break
                        j += 1
                    filter_date.reverse()
                    filter_title.reverse()
                    filter_hyperTitle.reverse()
                    f = open(file,'w')
                    res = num_data[i].get_text().strip() + '~:' + "title"
                    f.write(res)
                    f.close()
                    info1 = Crawler.Information(filter_hyperTitle, filter_title, 1, filter_date)
                    info = []
                    info.append(info1)

                    put_noti(info)
                    print('\n새로운 공지 올라왔습니다.')
            else: #파일이 없으면 그냥 쓰기. 
                f = open(file,'w')
                res = num_data[i].get_text().strip() + '~:' + title[i]
                f.write(res)
            break
        else :
            print('고정해놓은거다', end = '')
            print(num_data[i].get_text().strip())
        i += 1