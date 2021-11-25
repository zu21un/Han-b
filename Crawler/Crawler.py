import requests
from bs4 import BeautifulSoup
import inspect
from urllib.request import urlopen
from urllib.request import Request
import emailTest 
import schedule
import time

# print ("한양대학교 컴퓨터소프트웨어 학부")
# webpage = requests.get("http://cs.hanyang.ac.kr/board/info_board.php")
# soup = BeautifulSoup(webpage.content, "html.parser")
# # print('soup : ')
# # print(soup)
# data = soup.select('.left')

# for i in range(0, len(data) ):
#     print(data[i].get_text())

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
            
            

            # Crawler.text += data.get_text()
            for i in range(0, len(data) ):
                Crawler.text += data[i].get_text()
                # print(data[i].get_text())
        except Exception as e:
            print('Exception ')
        #   raise CrawlerException(e)

        return data #string형식으로 반환.





    def getData2(): #데이터 가져오는것.
        print ("한양대학교 소프트웨어중심대학")
        req = Request("http://hysoft.hanyang.ac.kr/modules/board/bd_list.html?id=wt_notice")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
        req.add_header("Accept-Language", "ko-KR,ko;")
    #   req.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36")

        data = ''

        try:
            
            response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

            html = response.read()
            print(html)
            soup = BeautifulSoup(html, 'html.parser')


            
            data = soup.select('.alLeft')
            
            for i in range(0, len(data) ):
                print(data[i].get_text())
        except Exception as e:
            print('Exception ')
        #   raise CrawlerException(e)

        return data #string형식으로 반환.

    def getData3(): #데이터 가져오는것.
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


            # print(soup)
            # for line in response: #response에서 읽은 데이터를 list형태로 가져와서 data에 한줄씩 넣어주는듯. 
            #         data += line
            data = soup.select('.left > a:nth-of-type(1)')
            
            # print(data)

            
            for i in range(0, len(data) ):
                print(data[i].get_text())
        except Exception as e:
            print('Exception ')
        #   raise CrawlerException(e)

        return data #string형식으로 반환.

c = Crawler()
c.getData1()

e = emailTest.Email()


schedule.every(3).minutes.do(e.send_mail,Crawler.text) # 3분마다 job 실행
while True:
    schedule.run_pending()
    time.sleep(1)


# print(c.text)
# getData1()
# getData2()
# getData3()
# class MyClass(object):
#     def __init(self, a=1):
#         pass
#     def somemethod(self, b=1):
#         pass

# for i in inspect.getmembers(MyClass):
#     print(i)
# print()
# print(inspect.getmembers(MyClass, predicate=inspect.isfunction))