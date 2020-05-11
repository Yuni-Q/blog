---
title: Socket
date: 2020-05-12 08:05:49
category: javascript
draft: false
---

## socket.to(소켓 아이디).emit(이벤트, 데이터)

- 나를 제외한 나머지 사람에게 메시지를 보내고 싶을 때는 socket.broadcast 객체를 이용합니다.
- to 메서드와 같이 사용하면 특정 방 안에서 나를 제외한 나머지에게 메시지를 보낼 수 있습니다.

## 나를 제외한 전체에게 메시지 보내기

- socket.broadcast.emit(이벤트, 데이터);
- socket.broadcast.to(방 아이디).emit(이벤트, 데이터);
