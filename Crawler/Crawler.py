import requests
from bs4 import BeautifulSoup
import inspect
from urllib.request import urlopen
from urllib.request import Request
import SendingEmail 
import schedule
import time
import boto3
import traceback

class Information:
    def __init__(self, hypertitle, title):
        self.hypertitle = hypertitle
        self.title = title


class Crawler:
    text = ''

    def __init__(self):
        pass

    def getData1(self): #데이터 가져오는것.
        print ("한양대학교 컴퓨터소프트웨어 학부")
        req = Request("http://cs.hanyang.ac.kr/board/info_board.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")
    #   req.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36")

        data = ''

        try:
            
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.
            
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            data = soup.select('.left')
            
            #head태그의 link에 접근해 한양대학교 컴퓨터소프트웨어학부의 처음 url을 가져옴
            headInlink = soup.find('head').find('link')
            link = headInlink['href']
            
            

            title = []
            for i in range(0, len(data) ):
                title.append(data[i].get_text().strip() )


            hyperTitle = []
            for i in range(0, len(data)):
                hyperTitle.append( (link + data[i].find('a')['href']).strip()  )

            info = Information(hyperTitle, title)

        except Exception as e:
            print('Exception ')
        #   raise CrawlerException(e)

        return info #string형식으로 반환.





    def getData2(self): #데이터 가져오는것.
        print ("한양대학교 소프트웨어중심대학")
        req = Request("http://hysoft.hanyang.ac.kr/modules/board/bd_list.html?id=wt_notice")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")
    #   req.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36")

        data = ''

        try:
            
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

            html = response.read()
            # print(html)
            soup = BeautifulSoup(html, 'html.parser')
            data = soup.select('.alLeft')
            
            #head태그의 link에 접근해 한양대학교 컴퓨터소프트웨어학부의 처음 url을 가져옴
            headInlink = soup.find('head').find('link')
            link = headInlink['href']
            print(link)

            title = []
            for i in range(0, len(data) ):
                title.append(data[i].get_text().strip())

            # print(data[i].find('a')['href'])
            hyperTitle = []
            for i in range(0, len(data)):
             
                hyperTitle.append((link + data[i].find('a')['href']).strip())

            info = Information(hyperTitle, title)

            
        except Exception as e:
            print('Exception ')
        

        return info #string형식으로 반환.

    def getData3(self): #데이터 가져오는것.
        print ("한양대학교 공과대학교")
        req = Request("http://eng.hanyang.ac.kr/people/notice.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")
    #   req.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36")
        data = ''
        try:
            
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.
            # print(response)
            
            html = response.read()
            # print(html)
            soup = BeautifulSoup(html, 'html.parser') #여기서 오류발생. 

            #Beautifulsoup를 통해 가져온 html을 select로 뽑아내기.
            data = soup.select('.left > a:nth-of-type(1)')
            
            
            #head태그의 link에 접근해 한양대학교 컴퓨터소프트웨어학부의 처음 url을 가져옴
            headInlink = soup.find('head').find('link')
            link = headInlink['href']
            print(link)

            title = []
            for i in range(0, len(data) ):
                title.append(data[i].get_text().strip())
                print(title[i])

            hyperTitle = []
            for i in range(0, len(data)):
                hyperTitle.append((link + (data[i])['href']).strip())

            info = Information(hyperTitle, title)


        except Exception as e:
            print('Exception ')
        #   raise CrawlerException(e)

        return info #string형식으로 반환.

info = Crawler().getData3()


for i in range(0, len(info.hypertitle)):
    print('info.hyperlink : ' + info.hypertitle[i])
    print('info.title : ' + info.title[i])


# dynamodb = boto3.resource('dynamodb')

# # print(dynamodb.get_item(TableName='Notification', Key={'id'}))

# table = dynamodb.Table('Notification-iwrkzo6ufzfpxidyj5nch7lk5a-dev')
# # print(table.table_status)


# try:

#     print(table.creation_date_time)

#     # table.put_item(
#     #     Item = {
#     #         'title': 'asdf',
#     #         'duration':'안녕하세요'
#     #     }
#     # )
# except Exception as e:
#     print(traceback.format_exc())



# dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2', aws_access_key_id='AKIAWNLMFLQOXWJMQRXQ',aws_secret_access_key='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')
# #end_point =  https://dynamodb.ap-northeast-2.amazonaws.com
# table = dynamodb.Table('Notification')

# client =boto3.client('dynamodb')

# response = client.get_item(
#     TableName = 'Notification',
#     Key = {id:'1'}

# )
# try:
#     dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
#     # , aws_access_key_id='AKIAWNLMFLQOXWJMQRXQ',aws_secret_access_key='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'
# #end_point =  https://dynamodb.ap-northeast-2.amazonaws.com
#     table = dynamodb.Table('Notification')

#     table.put_item(Item={
#         'id': 5,
#         'content': '',
#         'link':'안녕하세요'
#     })
# except Exception as e:
#     print(e.response)


# e = SendingEmail.Email()


# schedule.every(3).minutes.do(e.send_mail,Crawler.text) # 3분마다 job 실행
# while True:
#     schedule.run_pending()
#     time.sleep(1)


