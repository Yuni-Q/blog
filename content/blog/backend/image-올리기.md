---
title: image 올리기
date: 2020-05-25 22:05:00
category: backend
draft: false
---

- multer
  - single, array, fields
- single은 하나의 이미지를 업로드 ( req.file )
- array와 fields는 여러개의 미미지를 업로드 ( req.files )
- body 속성 하나에 이미지를 여러개 업로드 array
- 여러개의 속성에 이미지를 하나씩 업로드 fields
- none은 이미지를 올리지 않고 데이터만 multipart 형식으로 전송
- multer-s3나 multer-google-storage 사용
