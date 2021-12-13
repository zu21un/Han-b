import requests
from bs4 import BeautifulSoup
import inspect
from urllib.request import urlopen
from urllib.request import Request
import SendingEmail 
# import schedule
import time
import traceback
import datetime


class Information:
    filter_text = []

    def __init__(self, hypertitle, title, organization, date):
        self.hypertitle = hypertitle
        self.title = title
        self.organization = organization
        self.date = date
    
    # def load(self, hypertitle, title):

class Crawler:
    text = ''

    def __init__(self):
        pass

    def getData1(self): #데이터 가져오는것.
        print ("한양대학교 컴퓨터소프트웨어 학부")
        req = Request("http://cs.hanyang.ac.kr/board/info_board.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")

        data = ''
        try:
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.
            
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            data_date = soup.select('#content_box > div > table > tbody > tr > td:nth-child(5)')

            data = soup.select('.left')
            #head태그의 link에 접근해 한양대학교 컴퓨터소프트웨어학부의 처음 url을 가져옴
            headInlink = soup.find('head').find('link')
            link = headInlink['href']

            title = []
            for i in range(0, len(data) ):
                title.append(data[i].get_text().strip() )

            # 하이퍼링크 저장
            hyperTitle = []
            for i in range(0, len(data)):
                hyperTitle.append( (link + data[i].find('a')['href']).strip() )

            #date 저장
            date = []
            for i in range(0, len(data_date)):
                list = (data_date[i].get_text().strip()).split('.')
                d = datetime.datetime( int( '20'+list[0]) , int(list[1]) , int(list[2]) )

                date.append( d )
            
            info = Information(hyperTitle, title, 1, date)

        except Exception as e:
            print('Exception!', e)
        #   raise CrawlerException(e)

        return info #string형식으로 반환.

    def getData2(self): #데이터 가져오는것.
        print ("한양대학교 소프트웨어중심대학")
        req = Request("http://hysoft.hanyang.ac.kr/modules/board/bd_list.html?id=wt_notice")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")
    
        data = ''

        try:
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

            html = response.read()
            # print(html)
            soup = BeautifulSoup(html, 'html.parser')
            data = soup.select('.alLeft')
            data_date = soup.select('#subContainer > div.m00.m11 > div > div.con > form:nth-child(2) > table > tbody > tr > td:nth-child(4)')
            
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
            
            date = []
            for i in range(0, len(data_date)):
                list = (data_date[i].get_text().strip()).split('.')
                
                d = datetime.datetime( int( list[0]) , int(list[1]) , int(list[2]) )
                
                date.append( d )

            info = Information(hyperTitle, title, 2, date)

            
        except Exception as e:
            print('Exception!', e)
        

        return info #string형식으로 반환.

    def getData3(self): #데이터 가져오는것.
        print ("한양대학교 공과대학교")
        req = Request("http://eng.hanyang.ac.kr/people/notice.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header('Accept-Language', 'ko;q=0.8')
        req.add_header('Accept-Charset', 'utf-8;q=0.7,*;q=0.3')
        # req.add_header("Accept-Language", "ko-KR,ko;")
        data = ''
        try:
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser') #여기서 오류발생. 
            
            headInlink = soup.find('head').find('link')
            link = headInlink['href']
            
            title = []
            hyperTitle = []
            date = []
            data = soup.select('tbody > tr')
            for tr in data:
                tds = tr.select('td')
                notidate = tds[3].text.split('.')
                hyperTitle.append((link + tds[1].select('a')[0]['href']).strip())
                title.append(tds[1].select('a')[0].text)
                date.append( datetime.datetime(int(notidate[0]), int(notidate[1]), int(notidate[2])) )
                # print(tds[1].select('a')[0]['href'])
                # print(tds[1].select('a')[0].text)
                # print(tds[3].text)

            info = Information(hyperTitle, title, 3, date)

            #Beautifulsoup를 통해 가져온 html을 select로 뽑아내기.
            # data = soup.select('.left > a:nth-of-type(1)')
            # #content_in > div > table.bbs_con > tbody > tr:nth-child(17) > td.left > a:nth-child(2)
            # #content_in > div > table.bbs_con > tbody > tr:nth-child(14) > td.left > a:nth-child(2)
            # data_date = soup.select('#content_in > div > table.bbs_con > tbody > tr:nth-child(17) > td.left > a:nth-child(2)')
            # title = []
            # for i in range(0, len(data) ):
            #     title.append(data[i].get_text().strip())
            #     # print(title[i])

            # hyperTitle = []
            # for i in range(0, len(data)):
            #     hyperTitle.append((link + (data[i])['href']).strip())
            # date = []
            # for i in range(0, len(data_date)):
            #     list = (data_date[i].get_text().strip()).split('.')
            #     print(list)
            #     d = datetime.datetime( int( list[0]) , int(list[1]) , int(list[2]) )    
            #     date.append( d )
            
        except Exception as e:
            print('Exception!', e)
        #   raise CrawlerException(e)

        return info #string형식으로 반환.
        
# Information class에 keyword를 저장해놓기
# save_str = ''
# for item in response['Items']:
#     for j in item['name']:
#         save_str += j
#     # print(save_str)
#     Information.filter_text.append(save_str)
#     save_str = ''


#filtering한것
# for i in range(0, len(info)):
#     for j in range(0, len(info[i].title)):
#         for text in Information.filter_text:
#             if text in info[i].title[j]:
#                 name = 'Bob'
#                 title =  info[i].title[j]
#                 res = f'{text} : {title}'
#                 print(res)
#                 print()

# e = SendingEmail.Email()

# schedule.every(3).minutes.do(e.send_mail,Crawler.text) # 3분마다 job 실행
# while True:
#     schedule.run_pending()
#     time.sleep(1)