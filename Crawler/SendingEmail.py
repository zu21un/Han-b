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
        smtp.login('hanb.info@gmail.com','bdtpyvyqvbvdmmag')

        html_massage= templete(payload)
        body = make('hanb.info@gmail.com', usermail, '오늘의 공지입니다.', html_massage)

        # smtp sendmail 함수를 이용하여 실제로 메일을 발송해줍니다.
        smtp.sendmail('hanb.info@gmail.com', usermail, body)

        # smtp quit 함수로 인스턴스를 종료시킵니다.
        print('mali보내기 끝')
        smtp.quit()

def templete(payload):
    
    orglist = ['컴퓨터소프트웨어학부', '소프트웨어중심사업단', '한양대공과대학교']
    listr = ""
    date = payload[0]['date']
    for idx,noti in enumerate(payload):
        listr += """
            <li style="position: relative;
                    display: block;
                    margin-top: 24px;
                    height: 14px;">
                <div>
                    <a style="margin-top:10px; margin-bottom:10px; color:rgb(92, 89, 89);
                        text-decoration: none;" href="""+ noti['link'] +""" target="_blank" class="text">"""+ noti['name'] + " "+"""<i>"""+" "+orglist[int(noti['orgId'])]+"""</i></a>
                </div>
            </li>
        """
        
    return """
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        @import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great|Zilla+Slab:300,400');

                    # .body {
                    #     width: 800px;
                    #     height: 600px;
                    #     background: #201C29;
                    # }

                    # .frame {
                    #     position: absolute;
                    #     width: 500px;
                    #     height: 500px;
                    #     margin-top: 250px;
                    #     margin-left: 100px;
                    #     border-radius: 2px;
                    #     box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, 0.6);
                    #     background: #003F75;
                    #     color: #497081;
                    #     font-family: 'zilla slab', serif;
                    #     -webkit-font-smoothing: antialiased;
                    #     -moz-osx-font-smoothing: grayscale;
                    #     font-size: .9rem;
                    # }

                    .list {
                        position: absolute;
                        
                        width: 500px;
                        height: 500px;
                        margin-top: -100px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #fff;
                        box-shadow: 1rem 1rem .5rem rgba(0, 0, 0, 0.15);
                        border-radius: 3px;
                    }

                    .list .head {
                    padding: 20px 0;
                    margin: auto;
                    text-align: center;
                    border-bottom: 1px solid rgba(0, 62, 117, .5);
                    }

                    .list .title {
                        font-family: 'fredericka the great', cursive;
                        font-weight: 500;
                        text-align: center;
                        font-size: 2.5rem;
                        color: rgba(0, 62, 117, .8);
                    }

                    .list .subtitle {
                    font-size: .9rem;
                    text-align: center;
                        letter-spacing: .5px;
                    }

                    .list ul {
                    list-style: none;
                    padding: 4px 0;
                    margin: 0 30px;
                        font-weight: 300;
                    }

                    .list ul li {
                    position: relative;
                    display: block;
                    margin: 24px 0;
                    height: 14px;
                    }

                    a:link {
                        color:rgb(92, 89, 89);
                        text-decoration: none;
                    }
                    a:visited {
                        color:rgb(92, 89, 89);
                        text-decoration: none;
                    }
                    a:active {
                        color:rgb(92, 89, 89);
                        text-decoration: none;
                    }

                    .list ul .text {
                    float: left;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                    }

                    ul li:nth-of-type(2) {
                        animation: slide-up 1s;
                    }

                    ul li:nth-of-type(3) {
                        animation: slide-up 1.5s;
                    }

                    ul li:nth-of-type(4) {
                        animation: slide-up 2s;
                    }

                    @keyframes slide-up {
                        0% {
                            opacity: 0;
                            transform: translateY(5rem);
                        }
                    }

                    .list ul .button {
                    position: relative;
                        z-index: 2; 
                    box-sizing: border-box;
                    float: right;
                    width: 20px;
                    height: 20px;
                    border: 1px solid fade-out(#003F75, .5);
                    border-radius: 50%;
                    cursor: pointer;
                    }


                    .list ul .checkmark {
                    position: absolute;
                    stroke: rgba(100, 58, 122, .5);
                    fill: none;
                    stroke-dashoffset: 340;
                    stroke-dasharray: 360;
                    }

                    .list ul input {
                    display: none;
                    }

                    ul li .wrapper {
                        position: absolute;
                        width: 20px;
                    right: 0;
                    }

                    .checkmark {
                    display: block;
                    stroke-width: 8;
                        opacity: 0;
                    }

                    @keyframes dash {
                    0% {
                        stroke-dashoffset: 340;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                    }
                    </style>
                </head>
                <body id"body" style="display:flex; justify-content:center; align-items:center; width:800px; background: #201C29;">
                    <div id="frame" style="position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 800px;
                                height: 800px;
                                border-radius: 2px;
                                box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, 0.6);
                                background: #003F75;
                                color: #497081;
                                font-family: 'zilla slab', serif;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                                    font-size: .9rem;">
                        <div id="list" style="position: absolute;
                                width: 600px;
                                height: 600px;
                                top: 50%;
                                left: 50%;
                                margin-top: 100px;
                                margin-left: 100px;
                                transform: translate(-50%, -50%);
                                background: #fff;
                                box-shadow: 1rem 1rem .5rem rgba(0, 0, 0, 0.15);
                                border-radius: 3px;">
                            <div id="head" style="padding: 20px 0;
                                        margin: auto;
                                        text-align: center;
                                        border-bottom: 1px solid rgba(0, 62, 117, .5);">
                                <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3499f6b7-f6ef-41ea-b07a-b62e65039461/hanb.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211215T193017Z&X-Amz-Expires=86400&X-Amz-Signature=ff317f2dcceac58fa5b5b3a2295e060bd74b57fa760737aede5c4cf12c2dd95b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hanb.png%22&x-id=GetObject" width="350px"/>
                                <div style="font-size: .9rem;
                                        text-align: center;
                                            letter-spacing: .5px;">""" + date + """일 공지</div>
                            </div>
                            <ul style="list-style: none;
                                    padding: 4px 0;
                                    margin: 0 30px;
                                        font-weight: 300;">
                                """ + listr + """
                            </ul>
                        </div>
                    </div>	
                </body>
            </html>
        

            <!-- TO DO : Find out how to create new items + congrats message when all done-->

            
    """

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