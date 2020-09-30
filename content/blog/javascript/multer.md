---
title: multer
date: 2020-09-30 10:09:68
category: javascript
tags: ['multer']
draft: true
---

## 로컬 저장

```javascript
const multer = require('multer');

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, '/uploads');
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path, basename(file, originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});
```

## S3 저장

```javascript
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: 'ap-northeast-2',
});

const upload = multer({
	storage: multerS3({
		s3: new AWS.S3(),
		bucket: 'yuniq',
		key(req, file, cb) {
			cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});
```

## 버켓 정책 편집기

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AddPerm",
			"Effect": "Allow",
			"Principal": "*",
			"Action": ["s3:GetObject", "s3:PutObject"],
			"Resource": "arn::aws:s3:::yuniq/*"
		}
	]
}
```

## 람다 함수

```javascript
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
	const Bucket = event.Records[0].s3.bucket.name;
	const Key = event.Records[0].s3.object.key;
	const filename = Key.split('/')[Key.split('/').length - 1];
	const ext = Key.split('.')[Key.split('.').length - 1];
	const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg 사용합니다.
	console.log('name', filename, 'ext', ext);

	try {
		const s3Object = await s3.getObject({ Bucket, Key }).promise(); // 버퍼로 가져오기
		console.log('original', s3Object.Body.length);
		const resizedImage = await sharp(s3Object.Body) // 리사이징
			.resize(200, 200, { fit: 'inside' })
			.toFormat(requiredFormat)
			.toBuffer();
		await s3
			.putObject({
				// thumb 폴더에 저장
				Bucket,
				Key: `thumb/${filename}`,
				Body: resizedImage,
			})
			.promise();
		console.log('put', resizedImage.length);
		return callback(null, `thumb/${filename}`);
	} catch (error) {
		console.error(error);
		return callback(error);
	}
};
```

## 참고

- [노드교과서 개정판 16장](https://www.youtube.com/watch?v=mmRRqWl6qAM&t=751s)
- [ZeroCho/nodejs-book](https://github.com/ZeroCho/nodejs-book)
