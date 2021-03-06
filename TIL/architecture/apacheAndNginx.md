
### 웹서버

#### Apache(멀티)
아파치 HTTP 서버(영어: Apache HTTP Server)는 아파치 소프트웨어 재단에서 관리하는 HTTP 웹 서버입니다.<br>
BSD, 리눅스 등 유닉스 계열 뿐 아니라 마이크로소프트 윈도우나 노벨 넷웨어 같은 기종에서도 운용할 수 있습니다.<br>
Apache : 요청마다 스레드 혹은 프로세스 생성 및 처리  

#### Nginx(싱글)
Nginx(엔진 x라 읽는다)는 웹 서버 소프트웨어로, 가벼움과 높은 성능을 목표로 합니다.<br>
웹 서버, 리버스 프록시 및 메일 프록시 기능을 가집니다.<br>
Nginx : 요청마다 비동기 이벤트를 발생시켜 처리


##### 특징
> Module로 구성<br>
> Event-driven 이면서 비동기 방식(Asynchronous)으로 동작<br>
> Single-threaded(worker 프로세스)<br>
> Non-blocking<br>

> 2017년 10월 기준으로 실질적으로 작동하는 웹 사이트(active site)들에서 쓰이는 웹 서버 소프트웨어 순위는 아파치(44.89%), 엔진엑스(20.65%), 구글 웹 서버(7.86%), 마이크로소프트 IIS(7.32%)순이다. 이 조사에서 생성은 되어있으나 정상적으로 작동하지 않는 웹 사이트들은 배제되었으며 특히 MS의 인터넷 정보 서비스(IIS)를 설치한 웹 사이트들의 상당수가 비활성 사이트였다. 그런 사이트들도 포함하면 MS IIS가 1위이다. 2017년 6월 현재 Nginx는 한국 전체 등록 도메인 중 24.73%가 사용하고 있습니다.

---
참조 : [[Nginx] Ubuntu에서 apt-get을 통해 Nginx 설치하기 및 간단한 정리](https://twpower.github.io/39-install-nginx-on-ubuntu-by-using-apt-get-and-brief-explanation)