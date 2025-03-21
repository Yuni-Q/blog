---
title: s3로 string 값 관리하기
date: 2021-05-24 01:05:52
category: develop
tags: []
draft: true
---

```ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  region: 'ap-northeast-2',
});

await s3
  .putObject({
    Bucket: process.env.Bucket,
    Key: 'access',
    ACL: 'public-read',
    ContentType: 'text/plain',
    Body: access,
  })
  .promise();

const accessKey = await s3
  .getObject({
    Bucket: process.env.Bucket,
    Key: 'access',
  })
  .promise();

console.log(accessKey);
```
