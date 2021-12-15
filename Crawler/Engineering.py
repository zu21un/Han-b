
# import requests
from urllib.request import urlopen
from urllib.request import Request
from bs4 import BeautifulSoup
import os
import os.path 
import boto3
import datetime
def Engineering():
    print ("한양대학교 공과대학교")
    req = Request("http://eng.hanyang.ac.kr/people/notice.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
    req.add_header('Accept-Language', 'ko;q=0.8')
    req.add_header('Accept-Charset', 'utf-8;q=0.7,*;q=0.3')

        
    response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    headInlink = soup.find('head').find('link')
    link = headInlink['href']


    data = soup.select('.left')
    # data = soup.select('#content_box > div > table > tbody > tr > td.left > a') #제목
    headInlink = soup.find('head').find('link')
    link = headInlink['href']


    title = []
    hyperTitle = []
    date = []
    num_data = []
    data = soup.select('tbody > tr')
    for tr in data:
        tds = tr.select('td')
        num_data.append(tds[0].get_text().strip()) 
        notidate = tds[3].text.split('.')
        hyperTitle.append((link + tds[1].select('a')[0]['href']).strip())
        title.append(tds[1].select('a')[0].text)
        date.append( datetime.datetime(int(notidate[0]), int(notidate[1]), int(notidate[2])) )


    # for i in range(0, len(num_data)):
    #     print(num_data[i])


    file = './공과대학교.txt' 

    i = 0

    while 1:  
        if os.path.isfile(file):#파일이 존재하면 비교해서 새로운 공지가 올라왔는지 판단.
            print("파일이 존재합니다.")
            
            f = open(file,'r')

            text = f.readlines()
            list = text[0].split('~:')
            print(list[0] +' ' +list[1])

            if(list[0] == num_data[i] and list[1] == title[i]):#같으면 할필요없음.
                print('새로운 공지 올라오지 않았습니다.')
            else:#같지 않으면 새로운 공지가 올라왔다는 소리.
                session = boto3.Session(profile_name='bns')
                dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
                notiTable = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
                j = i
                while 1:
                    if j >= len(num_data):
                        break

                    if not list[0] in num_data[j]:#새로운 공지 올라왔으니 이전공지까지 데이터를 넣어주려고함.
                        #여기에 올려주면됨
                        print( num_data[j] + ' ' + title[j] )
                    else : 
                        break
                    j += 1
                
                f = open(file,'w')
                res = num_data[i] + '~:' + title[i]
                f.write(res)

                print('\n새로운 공지 올라왔습니다.')

            break

        else: #파일이 없으면 그냥 쓰기. 
            f = open(file,'w')
            res = num_data[i] + '~:' + title[i]
            f.write(res)
            break
        
        i += 1
        

