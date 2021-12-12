# clien_market_parser.py
# import requests
from urllib.request import urlopen
from urllib.request import Request
from bs4 import BeautifulSoup
import os

# 파일의 위치
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

req = Request("http://cs.hanyang.ac.kr/board/info_board.php")# urllib.request 데이터를 보낼 때 인코딩하여 바이너리 형태로 보낸다 없는 페이지를 요청해도 에러를 띄운다
req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
req.add_header("Accept-Language", "ko-KR,ko;")

    
response = urlopen(req, None, 60) # url : 열고자 하는 URL 문자열, request 클래스의 인스턴스가 포함. 아마 html을 return함.

html = response.read()
soup = BeautifulSoup(html, 'html.parser')



#content_box > div > table > tbody > tr:nth-child(1) > td.left > a
#content_box > div > table > tbody > tr:nth-child(12) > td.left > a
#content_box > div > table > tbody > tr:nth-child(15) > td.left > a

#content_box > div > table > tbody > tr:nth-child(15) > td:nth-child(2)
#content_box > div > table > tbody > tr:nth-child(20) > td:nth-child(2)

title_data = soup.select('#content_box > div > table > tbody > tr > td.left > a') #제목

print(title_data)
num_data = soup.select('#content_box > div > table > tbody > tr > td:nth-child(2)') #번호
print(num_data)


# print(data)



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