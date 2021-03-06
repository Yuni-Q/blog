
# [테크] 마임 (MIME) 이란?

## 아스키와 바이너리 (ASCII, Binary)
컴퓨터는 0 과 1로 이뤄진 이진수만 이해할 수 있습니다.  
"바이너리(binary)"라는 단어가 "이진의", "이진수의"라는 의미입니다.   

"ANSI"라는 표준을 정하는 곳에서 각 문자에 해당하는 숫자값을 하나로 통일하자는 목적 아래 "ASCII"라는 표준을 만듭니다.   
"ASCII"는 "American Standard Code for Information Interchange"의 약자입니다. 단어 뜻대로 정보 교환을 위한 미국 표준 코드입니다.  

컴퓨터가 정보 처리를 할 때 사용하는 기본 단위는 바이트(byte)입니다.  
바이트는 8비트를 줄인 말입니다. 이런 것이 1바이트입니다.  

8자리의 이진수를 1바이트라고 하는 것입니다.  
1바이트는 십진수로 고치면 최소 0(00000000)부터 최대 255(11111111) 사이의 값이 됩니다.  
ANSI는 0부터 255까지의 숫자를 알파벳과 특수문자에 하나하나 대응시켰습니다.  
a는 97, W는 87 ,... 이런 식으로 문자 마다 값을 지정을 했습니다.  

### 그런데 왜 'a'를 1이나 2처럼 앞의 숫자로 할당하지 32라는 큰 숫자로 지정했을까요?  
그것은 제어 문자(control character)라는 것이 필요했기 때문입니다.  
당시 컴퓨터 단말기의 표준격인 TTY에 쓰이던 제어 문자를 위해 앞의 0-32를 남겨둬야 했습니다.  
제어 문자는 폰트가 바뀐다든지, 전송의 끝을 알리는 문자 같은 특수한 작업, 기능, 이벤트를 알려주는 특수 문자입니다.  

제어 문자에 할당한 0-32 다음 값인 33부터 화면상에 보여지는 보통의 문자를 짝지운 것입니다.  
아스키 33은 !이고, 34는 ", 35는 #, ... 이렇게 하면 0부터 127까지 사용해서 모든 '문자'를 다 표시할 수 있습니다. 
따라서 8비트 중 128 부터 255까지는 사용할 필요가 없었습니다.  

### 이것을 이진수로 바꿔보면 1바이트 이진수의 맨 첫 번째 자리는 사용할 필요가 없다는 것이 됩니다.  
1111111가 127이니까요.  
그래서 아스키 문자의 이진수 값은 첫 숫자가 0입니다.  
이것을 잘 기억해 두세요."7비트 아스키 문자"라는 용어는 그런 원리로 등장한 것입니다.  

### 문제는 컴퓨터 사이에서 이동되는 파일이 모두 다 아스키 문자로 이뤄진 텍스트 파일은 아니였다는 데서 출발합니다.

## 인코딩과 디코딩
이메일이나 기타 네트웍 상에서 데이타를 교환하는 시스템은 최초 아스키 문자로 이뤄진 파일만을 전송하는 것을 전제로 제작되었기 때문에 첫 번째 숫자가 1인 데이타가 섞여 있는 이들 8비트 바이너리 데이타를 제대로 전달할 수가 없었습니다.  
바이너리 파일을 기존의 시스템 상에서 문제 없이 전달하기 위해서는 이들을 다시 "아스키 문자 파일" 바꾸어서 전달할 필요가 있었습니다.  
즉, '바이너리'를 '텍스트'로 변환해야만 했습니다.  
> 그것을 인코딩(encoding)이라 합니다.  
> 바이너리 파일을 텍스트 파일로 바꾸는 것입니다.  
> 디코딩(decoding)은 인코딩 된 텍스트 파일을 다시 바이너리 파일로 변환하는 해독 과정을 의미합니다.  

## 마임(MIME)이란?
MIME은 Multipurpose?Internet?Mail?Extensions?의 약자로 일종의 인코딩 방식입니다.   
MIME은 이메일과 함께 동봉할 첨부 파일(attachment file)을 텍스트 문자로 전환해서 이메일 시스템을 통해 전달 하기 위해 개발되었기 때문에 이름이 "Internet Mail Extension"입니다.  
이제는 웹을 통해서 여러 형태의 파일을 전달하는 데 두루 쓰이고 있습니다.  

### 왜 UUEncode 방식이 있는데 MIME이란 인코딩이 또 나타나게 되었을까요?  
UUEncode 방식에는 단점이 있었습니다.  
문서 끝 부분의 공백이 사실은 공백이 아니라 변환되어야 할 값인데 공백을 무시하는 시스템의 경우엔 UUEncode 파일을 원형 그대로 전달 받을 수 없었다는 것 등의 단점이 있었습니다.  
그래서 UUEncode 방식을 대폭 보강한 새로운 인코딩 방식이 등장하게 되었고 그것이 MIME입니다.  
MIME은 특히 기존의 UUEncode 방식에서는 없었던 파일 포맷(또는 Content-type) 정보도 함께 담을 수 있습니다.  
'지금 전달하는 이 파일은 GIF 파일이다.', 'MOV 파일이다.'처럼 그 파일의 종류를 나타내는 딱지를 붙일 수 있었습니다.  
이렇게 MIME 에서 사용하는 인코딩 방식을 "base64"라고 합니다.  
방식은 위에서 본 것과 유사합니다. 8비트 3개를 6비트 4개로 바꿔서 적절한 변형을 합니다.  

## 마임의 타입(Type)
마임으로 인코딩 한 파일은 "Content-type" 정보를 파일의 앞 부분에 담고 있습니다.   
컨텐트 타입에는 여러 가지가 있습니다.  
이런 얘기를 들어 본 적이 있을 것입니다. '어떤 마임 타입 (MIME type)이 웹브라우져에서 지원된다, 안된다.' 그것은 '특정 컨텐트 타입의 파일을 웹 서버로부터 전달받아서 웹브라우져가 열 수 있다, 아니다.'라는 의미입니다.  
웹 브라우져가 웹 서버에 접속해서 html 문서를 요청하면서 html 문서 내에 담긴 이미지 태그내에 지정된 패쓰로부터 이미지 파일도 가져 옵니다.  
이 때 그 패쓰에 있는 파일이 웹 브라우져에서 지원되는 마임 타입이라면 웹 브라우져 내에서 열 수 있습니다.  
.jpg, .gif 파일 등은 브라우져 내에서 바로 뜨는 것입니다.(모자익 웹브라우져 당시만 해도 이것은 획기적인 기능이었습니다. 모자익 이전의 웹브라우져는 .jpg, .gif 마임 타입을 직접 지원하지 않았기 때문에 외부 그래픽 프로그램이 구동되면서 이미지를 보여 줬습니다)

초기 웹 브라우져는 표준적인 마임 타입들(.gif, .jpg, .mov,...)은 무리 없이 열렸지만 그렇지 않은 유형은 그 파일을 열어줄 프로그램을 손수 지정해야 했습니다.  
웹 브라우져 셋팅에 파일 포맷 별로 외부 프로그램을 연결하는 부분이 있었습니다.  
그런데 마이크로소프트가 웹 브라우져를 불공정하게 운영체계에 통합하면서 마임 타입 지정이 OS 차원으로 넘어 갑니다.  
윈도우즈 탐색기를 열어서 [보기 > 폴더옵션] 메뉴에 보면 아래 그림같이 "파일 형식"이라는 탭이 있습니다.  
여기에서 파일 확장자나 마임 타입 별로 구동될 프로그램을 설정하게 되어 있습니다.  

## 기타
Multipart

IETF
국제 인터넷 표준화 기구
인터넷 운영, 관리, 개발에 대해 협의
기술적인 관점에서 효율적인 인터넷 통신 관리

RFC
인터넷을 개발하는데 있어 필요한 절차나 기술을 적어 놓은 문서
누구나 작성 가능
폐지나 수정 불가 - 새로운 번호로 다시 출판

From
사용자로부터 할당 된 데이터 양식을 서버로 전송하는 역할

MIME
전자 우편을 위한 인터넷 표준 포맷

아스키가 아닌 문자 인코딩을 이용해 영어가 아닌 다른 언어로 된 전자 우편을 보낼 수 있는 방식을 정의

Multipart
단일 Body에 다중 Resource로 설계된 Type
여러가지를 올릴 때 멀티파트를 사용한다

파일 하나면 옥타스트림으로 올려도 된다
트랜잭션 유지 ( 이름을 같이 보내서 )에 유용하게 쓰인다

---
참조 : [[테크] 마임 (MIME) 이란?](http://www.emh.co.kr/content.pl?mime)
