# -*- coding:utf-8 -*-

# smtplib 과 MIMEText를 import 합니다.
import smtplib
from email.mime.text import MIMEText
import email
from email.mime.multipart import MIMEMultipart
# send_mail 함수에 구현하겠습니다.

class Email:
    def send_mail(payload, usermail):
        # 메일 내용을 담을 문자열을 선언합니다.

        # smtp 인스턴스를 만들어줍니다.
        # 인자값으로는 smtp 서버 url과 port가 들어갑니다.
        smtp = smtplib.SMTP('smtp.gmail.com', 587)

        # 초기에 서버와 handshaking 을 시도합니다.
        smtp.ehlo()
        # TLS를 이용해서 암호화할 것이므로 start tls 함수를 호출합니다.
        smtp.starttls()

        # smtp 서버 로그인을 위해 id 와 password를 인자로 하여 login 함수를 호출합니다.
        # id는 @가 들어간 email형식으로 입력합니다.
        smtp.login('sungsoo6811@gmail.com','bnsghkdlxld')

        html_massage= templete(payload[0])
        body = make('sungsoo6811@gmail.com', usermail, '오늘의 공지입니다.', html_massage)

        # smtp sendmail 함수를 이용하여 실제로 메일을 발송해줍니다.
        smtp.sendmail('sungsoo6811@gmail.com', usermail, body)

        # smtp quit 함수로 인스턴스를 종료시킵니다.
        print('adfadf')
        smtp.quit()

def templete(payload):
    return '''
        <h1>안녕하세요. 한양비서 한삐입니다.</h1>
        <p>{orgId}</p>
        <p>{name}</p>
        <p>{link}</p>
        <p>{date}</p>
    '''.format( orgId=payload['orgId'], name=payload["name"], link=payload["link"], date=payload["date"])

def make(sender, receiver, title, content):
    # MIMEText 인스턴스에는 보내려는 메일 내용을 인자값으로 넣어줍니다.
    # 메일 제목은 Subject, 보내는 사람은 From, 받을 사람 정보는 To로 설정합니다.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "%s"%title
    msg['From'] = sender
    msg['To'] = receiver
    html = MIMEText(content, 'html')
    msg.attach(html)
    return msg.as_string()

# send_mail()