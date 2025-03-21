---
title: react-native base
date: 2022-01-27 13:01:59
category: react-native
tags: []
draft: true
---

## [Flipper](https://fbflipper.com/)

- 페이스북이 만든 모바일앱 디버거도 좋음(다만 연결 시 에러나는 사람 다수 발견)
- setup doctor 문제 해결할 것
```zsh
npm i react-native-flipper redux-flipper rn-async-storage-flipper
npx pod-install # 아이폰 전용
```

### 플러그인
flipper-plugin-async-storage
flipper-plugin-redux-debugger
Layout, Network, Images, Database(sqlite), React Devtools, Hermes Debugger 사용 가능

## 앱 이름 변경
-   \android\app\src\main\res\values\strings.xml app.json의 displayName \ios\FoodDeliveryApp\Info.plist의 CFBundleDisplayName

## 환경변수, 키 값을 저장할 config 패키지

```zsh
npm i react-native-config
```

```ts
import Config from 'react-native-config';
```

### Config가 적용이 안 되면 다음 추가해야함

- android/app/proguard-rules.pro
```
-keep class com.fooddeliveryapp.BuildConfig { *; }
```

- android/app/build.gradle
```
apply plugin: "com.android.application"
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
...
    defaultConfig {
        ...
        resValue "string", "build_config_package", "com.fooddeliveryapp"
    }
```
## localhost로 하면 안드로이드에서 안 됨

- 10.0.2.2로 해야 함 암호화해서 저장할 데이터는 react-native-encrypted-storage를 활용

## android에서 http 요청이 안 보내지면

- android/app/src/main/AndroidManifest.xml 에서 태그에 android:usesCleartextTraffic="true" 추가


---

## 참고

- [ZeroCho/food-delivery-app](https://github.com/ZeroCho/food-delivery-app)