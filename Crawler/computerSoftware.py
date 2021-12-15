
# import requests
from urllib.request import urlopen
from urllib.request import Request
from bs4 import BeautifulSoup
import os
import os.path 
import boto3
import datetime

def test():
    req = Request("http://cs.hanyang.ac.kr/board/info_board.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
    req.add_header("Accept-Language", "ko-KR,ko;")

        
    response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')
    data_date = soup.select('#content_box > div > table > tbody > tr > td:nth-child(5)')

    data = soup.select('.left')
    # data = soup.select('#content_box > div > table > tbody > tr > td.left > a') #제목
    headInlink = soup.find('head').find('link')
    link = headInlink['href']


    title = []
    for i in range(0, len(data) ):
        title.append(data[i].get_text().strip() )

    hyperTitle = []
    for i in range(0, len(data)):
        if data[i].find('a')['href'][:4] == "http":
            hyperTitle.append(data[i].find('a')['href'].strip())
        else:
            hyperTitle.append( (link + data[i].find('a')['href']).strip() )

    date = []
    for i in range(0, len(data_date)):
        list = (data_date[i].get_text().strip()).split('.')
        d = datetime.datetime( int( '20'+list[0]) , int(list[1]) , int(list[2]) )

        date.append( d )


    # for item in title:
    #     print(item)
        


    num_data = soup.select('#content_box > div > table > tbody > tr > td:nth-child(2)') #번호


    file = './한양대학교 컴퓨터소프트웨어학부.txt' 

    i = 0
    while 1:
        if not '[공지]' in num_data[i].get_text().strip():#새로운공지인지 체크할만한 조건문
            
            if os.path.isfile(file):#파일이 존재하면 비교해서 새로운 공지가 올라왔는지 판단.
                print("파일이 존재합니다.")
                
                f = open(file,'r')

                text = f.readlines()
                list = text[0].split('~:')
                print(list[0] +' ' +list[1])
                if(list[0] == num_data[i].get_text().strip() and list[1] == title[i]):#같으면 할필요없음.
                    print('새로운 공지 올라오지 않았습니다.')
                else:#같지 않으면 새로운 공지가 올라왔다는 소리.
                    session = boto3.Session(profile_name='bns')
                    dynamodb = session.resource('dynamodb', region_name='ap-northeast-2')
                    notiTable = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
                    j = i
                    while 1:
                        if j >= len(num_data):
                            break
                        if not list[0] in num_data[j].get_text().strip():#새로운 공지 올라왔으니 이전공지까지 데이터를 넣어주려고함.
                            
                            #여기에 올려주면됨
                            print( num_data[j].get_text().strip() + ' ' + title[j] )

                        else : 
                            break
                        j += 1
                    
                    f = open(file,'w')
                    res = num_data[i].get_text().strip() + '~:' + title[i]
                    f.write(res)

                    print('\n새로운 공지 올라왔습니다.')



            else: #파일이 없으면 그냥 쓰기. 
                f = open(file,'w')
                res = num_data[i].get_text().strip() + '~:' + title[i]
                f.write(res)
            break
        else :
            print(num_data[i].get_text().strip())
        i += 1
        


# req = requests.get('http://clien.net/cs2/bbs/board.php?bo_table=sold')
# req.encoding = 'utf-8'

# html = req.text
# soup = BeautifulSoup(html, 'html.parser')
# posts = soup.select('td.post_subject')
# latest = posts[1].text

# with open(os.path.join(BASE_DIR, 'latest.txt'), 'r+') as f_read:
#     before = f_read.readline()
#     if before != latest:
#         # 같은 경우는 에러 없이 넘기고, 다른 경우에만
#         # 메시지 보내는 로직을 넣으면 됩니다.
#     f_read.close()

# with open(os.path.join(BASE_DIR, 'latest.txt'), 'w+') as f_write:
#     f_write.write(latest)
#     f_write.close()