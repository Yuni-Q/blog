---
title: adapter pattern
date: 2021-02-28 17:02:34
category: design pattern
tags: [design pattern]
draft: true
---

## adapter란?

- adapter는 다른 전기나 기계 장치를 서로 연결해서 작동할 수 있도록 만들어 주는 결합 도구를 뜻합니다.

## 디자인 패턴 분류

- 디자인 패턴에는 생성, 구조, 행위, 3가지 분류가 있습니다.
- 어댑터 패턴은 `구조`에 대한 패턴입니다.

### 구조 패턴

- 구조 패턴이란 작은 클래스들을 `상속`과 `합성`을 이용하여 더 큰 클래스를 생성하는 방법을 제공하는 패턴입니다.
- 서로 독립적으로 개발한 클래스 라이브러리를 마치 `하나인 것`처럼 사용할 수 있습니다. 또, 여러 인터페이스를 합성(Composite)하여 서로 다른 인터페이스들의 통일된 추상을 제공합니다.
- 구조 패턴의 중요한 포인트는 인터페이스나 구현을 복합하는 것이 아니라 객체를 `합성`하는 방법을 제공한다는 것입니다. 이는 컴파일 단계에서가 아닌 `런타임 단계`에서 복합 방법이나 대상을 변경할 수 있다는 점에서 유연성을 갖습니다.

## 호환성을 위한 패턴

- 일상 생활에서와 동일하게 어떤 인터페이스를 클라이언트에서 요구하는 형태의 인터페이스에 적응시켜주는 역할을 한다.
- 어뎁터 패턴은 B를 A처럼 포장하여 A로 사용할 수 있게 하는 패턴입니다.
- 이미 잘 구축되어 있는 것을 새로운 어떤 것이 사용 할 때 양쪽 간의 호환성을 유지해주기 위해 사용합니다.
- 한 클래스의 인터페이스를 클라이언트에서 사용하고자하는 다른 인터페이스로 변환합니다.

## 활용 상황

- 양쪽 모두 변경할 수 없을 때 사용합니다.
- 기존의 코드에 새로운 코드(써드파티 라이브러리 등)을 연동하여 사용하고 싶은데, 두 코드의 인터페이스가 달라, 이를 하나로 통일하여 사용하고 싶을 때 사용합니다.
- 리팩토링 없이도 기존의 클래스를 이용해 새로운 클래스를 만들 수 있습니다.

## 장점

- 관계가 없는 인터페이스를 같이 사용할 수 있습니다.
- 기존 클라이언트 단의 코드 수정을 최소화 할 수 있습니다.
- 클래스 재활용성이 증가합니다.
- 클라이언트는 연동부분을 몰라도, 새로운 코드의 기능을 일관되게 사용 가능합니다.

### 장점을 조금 더 길게 설명해 보겠습니다.

- 기존 클래스의 소스코드를 수정해서 인터페이스에 맞추는 작업보다는 기존 클래스의 소스 코드의 수정을 전혀 하지 않고 타겟 인터페이스에 맞춰서 동작을 가능하게 합니다. 즉, 기존 클래스의 명세만 알면 얼마든지 새로운 클래스를 작성할 수 있습니다. 이를 통해 소스코드가 간단해지고 유지볻보수도 원할하게 하는 이점이 있습니다.
- 어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있습니다. 이로 인해 호환되지 않는 인터페이스를 사용하는 클라이언트를 그대로 활용할 수 있습니다.
- 어댑터 패턴을 통해 클라이언트와 구현된 인터페이스를 분리시킬수 있으며, 향후 인터페이스가 바뀌더라도 그 변경 내역은 어댑터에 캡슐화 되기 때문에 클라이언트는 바뀔 필요가 없어집니다.

## 단점

- 어댑터 클래스에서 통일 시켜주는 부분을 구현해야 합니다.

## 클라이언트에서 어댑터를 사용하는 방법에 대해 살펴 보겠습니다.

1. 클라이언트에서 타겟 인터페이스를 사용하여 메소드를 호출함으로써 어댑터에 요청합니다.
2. 어댑터에서는 어댑티 인터페이스를 사용하여 그 요청을 어댑티에 대한 하나 이상의 메소드를 호출로 변환합니다.
3. 클라이언트에서는 호출 결과를 받긴 하지만 중간에 어댑터가 껴 있는지는 전혀 알지 못합니다.

- 클라이언트 -> request() -> 어댑터 - specificRequest() -> 어댑티.
- 클라이언트에서는 Target Interface를 호출하는 것처럼 보입니다. 하지만 클라이언트의 요청을 전달받은 (Target Interface 를 구현한) Adapter 는 자신이 감싸고 있는 Adaptee에게 실질적인 처리를 위임합니다. Adapter가 Adaptee를 감싸고 있는 것 때문에 `Wrapper 패턴`이라고도 불립니다.

## 어댑터에는 두종류가 있다.

### 클래스 어댑터 패턴

- 상속을 이용한 어댑터 패턴입니다.
- 클래스 어댑터에서는 어댑터를 만들 때 타겟과 어댑티 모두의 서브 클래스로 만듭니다.
- 클래스 어댑터 패턴은 다중 상속을 허용하는 프로그래밍 언어에서만 가능한 패턴이다.

### 객체 어댑터 패턴

- 구성(위임)을 이용한 어댑터 패턴입니다.
- 객체 어댑터 에서는 구성을 통해서 어댑티에 요청을 전달합니다.

## 구성

- 타입스크립트는 다중 상속을 지원하지 않기 때문에 객체 어댑터 패턴을 사용합니다.

### Target Interface

Adapter 가 구현(implements) 하는 인터페이스이다. 클라이언트는 Target Interface 를 통해 Adaptee 인 써드파티 라이브러리를 사용하게 된다.

```ts
interface MediaPlayer {
  play: (fileName: string) => void;
}

class MP3 implements MediaPlayer {
  play(fileName) {
    console.log(`MP3 : ${fileName}`);
  }
}
```

### Adaptee

- 써드파티 라이브러리나 외부시스템을 의미한다.

```ts
interface MediaPackage {
  playFile: (fileName: string) => void;
}

class MP4 implements MediaPackage {
  playFile(fileName) {
    console.log(`MP4 : ${fileName}`);
  }
}

class MKV implements MediaPackage {
  playFile(fileName) {
    console.log(`MKV : ${fileName}`);
  }
}
```

### Adapter

- Client 와 Adaptee 중간에서 호환성이 없는 둘을 연결시켜주는 역할을 담당한다. Target Interface 를 구현하며, 클라이언트는 Target Interface 를 통해 어댑터에 요청을 보낸다. 어댑터는 클라이언트의 요청을 Adaptee 가 이해할 수 있는 방법으로 전달하고, 처리는 Adaptee 에서 이루어진다.

```ts
class FormatAdapter implements MediaPlayer {
  media: MediaPackage;

  constructor(media: MediaPackage) {
    this.media = media;
  }

  play(fileName) {
    console.log('Using Adaper');
    this.media.playFile(fileName);
  }
}
```

### Client

- 써드파티 라이브러리나 외부시스템을 사용하려는 쪽이다.

```ts
const playerMP3 = new MP3();
playerMP3.play('file.mp3');
const playerMP4 = new FormatAdapter(new MP4());
playerMP4.play('file.mp4');
const playerMKV = new FormatAdapter(new MKV());
playerMKV.play('file.mkv');
```

## 어댑터 패턴 정리

- Adaptee를 감싸고, Target Interface만을 클라이언트에게 드러냅니다.
- Target Interface를 구현하여 클라이언트가 예상하는 인터페이스가 되도록 Adaptee의 인터페이스를 간접적으로 변경합니다.
- Adaptee가 기대하는 방식으로 클라이언트의 요청을 간접적으로 변경합니다.
- 호환되지 않는 우리의 인터페이스와 Adaptee를 함께 사용할 수 있습니다.

## 참고

- [디자인패턴 - 어댑터 패턴 (adapter pattern)](https://jusungpark.tistory.com/22)
- [Java 디자인패턴 - 어댑터(Adapter) 패턴](https://niceman.tistory.com/141)
- [디자인패턴 - 어댑터 패턴](https://yaboong.github.io/design-pattern/2018/10/15/adapter-pattern/)
- [\[구조 패턴\] 어댑터 패턴(Adapter Pattern) 이해 및 예제](https://readystory.tistory.com/125)
- [\[디자인 패턴 6편\] 구조 패턴, 어댑터(Adapter)](https://dailyheumsi.tistory.com/189)
- [코드 저장소](https://kimch3617.tistory.com/entry/어댑터-패턴-adapter-pattern)
- [코딩스타트](https://coding-start.tistory.com/256)
