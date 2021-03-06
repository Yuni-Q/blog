---
title: process와 thread의 차이
date: 2021-04-20 19:04:04
category: develop
tags: ['process', 'thread']
draft: true
---

## 프로세스란?

- 프로세스(process)는 컴퓨터에서 연속적으로 실행되고 있는 `컴퓨터 프로그램`을 말합니다.
- 종종 스케줄링의 대상이 되는 작업(task)이라는 용어와 거의 같은 의미로 쓰입니다.
- 여러 개의 프로세서를 사용하는 것을 멀티프로세싱이라고 하며 같은 시간에 여러 개의 프로그램을 띄우는 시분할 방식을 멀티태스킹이라고 합니다.
- 프로세스 관리는 운영 체제의 중요한 부분입니다.
- 프로그램은 일반적으로 하드 디스크 등에 저장되어 있는 실행코드를 뜻하고, 프로세스는 `프로그램을 구동하여 프로그램 자체와 프로그램의 상태가 메모리 상에서 실행되는 작업 단위를 지칭`합니다. 하나의 프로그램을 여러 번 구동하면 여러 개의 프로세스가 메모리 상에서 실행됩니다.
- 커널 내에는 준비 큐, 대기 큐, 실행 큐 등의 자료 구조가 있으며 커널은 이것들을 이용하여 프로세스의 상태를 관리합니다.
- 프로그램 실행 시 메모리에 올라가게 되는데 Code, Data, Heap, Stack 등으로 구성되어 있습니다. 그와 함께 PCB 블록이 생성 됩니다.
  - Code : 실행 명령을 포함하는 코드들
  - Data : Static 변수 혹은 Global 변수들
  - Heap : 동적 메모리 영역
  - Stack : 지역변수, 매개변수, 반환 값 등등 일시적인 데이터  

### 프로세스 특징

- 프로세스는 각각의 독립된 메모리 영역(Code, Data, Stack, Heap의 구조)을 할당 받습니다.
- 기본적으로 프로세스 당 최소 1개의 스레드를 가집니다.
- 각 프로세스는 별도의 주소 공간에서 실행되며, 다른 프로세스에 접근이 불가능합니다. 하지만 IPC(프로세스간 통신, Inter Process Communication)을 이용하여 다른 프로세스간 접근이 가능합니다. 대포적으로 채팅 프로그램을 구현할 때 필요한 Socket이 있습니다.

## 스레드란?

- 스레드(thread)는 어떠한 프로그램 내에서, 특히 프로세스 내에서 `실행되는 흐름의 단위`를 말합니다.
- 스레드는 Stack을 제외한 Code, Data, Heap 영역을 공유합니다.

### 스레드의 특징

- 스레드는 프로세스의 한계를 극복하기 위해 나온 것이므로 한 프로세스 내에 있는 여러 개의 스레드는 공유가 가능합니다.
- 스레드는 프로세스 내에서 각각 stack만 할당받고, Heap 영역을 서로 공유합니다.
- 같은 프로세스 내의 스레드는 같은 Heap 영역을 공유하는 반면에 다른 프로세스의 메모리에는 접근이 불가능합니다.

### 프로세스와 스레드의 비교

- 멀티프로세스와 멀티스레드는 양쪽 `모두 여러 흐름이 동시에 진행된다는 공통점`을 가지고 있습니다.
- 멀티프로세스에서 각 `프로세스는 독립적으로 실행`되며 `각각 별개의 메모리를 차지`하고 있는 것과 달리 멀티스레드는 `프로세스 내의 메모리를 공유`해 사용할 수 있습니다. 또한 프로세스 간의 전환 속도보다 `스레드 간의 전환 속도가 빠릅니다`.

### 멀티스레드의 장점

- 멀티스레드의 다른 장점은 CPU가 여러 개일 경우에 각각의 CPU가 스레드 하나씩을 담당하는 방법으로 속도를 높일 수 있다는 것입니다. 이러한 시스템에서는 여러 스레드가 실제 시간상으로 동시에 수행될 수 있기 때문입니다.
- 스레드끼리 메모리를 공유하고 있기 때문에 Context-Switching을 할 때 그 만큼 메모리를 아낄수 있습니다.
- 메모리영역을 공유하고 있기 때문에 응답시간이 빠릅니다.
- IPC와 같은 복잡한 통신기법이 필요하지 않습니다.

### 멀디스레드의 단점

- 멀티스레드의 단점에는 각각의 스레드 중 어떤 것이 먼저 실행될지 그 순서를 알 수 없다는 것입니다.
- 메모리영역을 공유하기 때문에 하나의 스레드가 문제가 발생하면 프로그램 전체에 영향을 줍니다.
- 메모리영역을 공유하기 때문에 동기화 문제가 발생할 수 있습니다. 동기화 문제를 반드시 해결해주어야 합니다.
- 설계가 어렵고, 디버깅이 까다롭습니다.

### 스레드의 종류

- 스레드를 지원하는 주체에 따라 2가지로 나눌 수 있습니다.
  - 사용자 레벨 스레드 (User-Level Thread)
  - 커널 레벨 스레드 (Kernel-Level Thread)

#### 사용자 레벨 스레드 (User-Level Thread)

- 사용자 스레드는 커널 영역의 상위에서 지원되며 일반적으로 사용자 레벨의 라이브러리를 통해 구현되며, 라이브러리는 스레드의 생성 및 스케줄링 등에 관한 관리 기능을 제공합니다.
- 동일한 메모리 영역에서 스레드가 생성 및 관리되므로 속도가 빠른 장점이 있는 반면, 여러 개의 사용자 스레드 중 하나의 스레드가 시스템 호출 등으로 중단되면 나머지 모든 스레드 역시 중단되는 단점이 있습니다. 이는 커널이 프로세스 내부의 스레드를 인식하지 못하며 해당 프로세스를 대기 상태로 전환시키기 때문입니다.

#### 커널 레벨 스레드 (Kernel-Level Thread)

- 커널 스레드는 운영체제가 지원하는 스레드 기능으로 구현되며, 커널이 스레드의 생성 및 스케줄링 등을 관리합니다.
- 스레드가 시스템 호출 등으로 중단되더라도, 커널은 프로세스 내의 다른 스레드를 중단시키지 않고 계속 실행시켜준다. 다중처리기 환경에서 커널은 여러 개의 스레드를 각각 다른 처리기에 할당할 수 있습니다. 다만, 사용자 스레드에 비해 생성 및 관리하는 것이 느립니다.

### 스레드 데이터

#### 스레드 기본 데이터

- 스레드도 프로세스와 마찬가지로 하나의 실행 흐름이므로 실행과 관련된 데이터가 필요합니다. 일반적으로 스레드는 자신만의 고유한 스레드 ID, 프로그램 카운터, 레지스터 집합, 스택을 가집니다. `코드, 데이터, 파일 등 기타 자원은 프로세스 내의 다른 스레드와 공유`합니다.

#### 스레드 특정 데이터

- 기본 데이터 외에도 하나의 스레드에만 연관된 데이터가 필요한 경우가 있는데, 이런 데이터를 스레드 특정 데이터(Thread-Specific Data, 줄여서 TSD)라고 합니다.
- 멀티스레드 프로그래밍 환경에서 모든 스레드는 프로세스의 데이터를 공유하고 있지만, 특별한 경우에는 개별 스레드만의 자료 공간이 필요합니다. 예를 들어 여러 개의 트랜잭션을 스레드로 처리할 경우, 각각의 트랜잭션 ID를 기억하고 있어야 하는데, 이때 TSD가 필요합니다. TSD는 여러 스레드 라이브러리들이 지원하는 기능 중의 하나입니다.

### 프로세스 관리의 변화

- 멀티스레드 환경이 확산됨에 따라 전통적인 프로세스 관리 방식에도 변화가 필요해졌습니다.

#### fork 문제

- 어떤 프로세스 내의 스레드가 fork를 호출하면 모든 스레드를 가진 프로세스를 생성할 것인지, 아니면 fork를 요청한 스레드만 가진 프로세스를 생성할 것인지 하는 문제입니다. 유닉스에서는 각각 2가지 버전의 fork를 지원하고 있습니다.

#### exec 문제

- fork를 통해 모든 스레드를 복제하고 난 후, exec를 수행한다면 모든 스레드들이 초기화됩니다. 그렇다면 교체될 스레드를 복제하는 작업은 필요가 없기 때문에 애초에 fork를 요청한 스레드만을 복제했어야 합니다. 한편, fork를 한 후에 exec를 수행하지 않는다면 모든 스레드를 복제할 필요가 있는 경우도 있습니다.

## 참고

- [프로세스](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4)
- [스레드 (컴퓨팅)](<https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)
- [King of Back-end](https://kingofbackend.tistory.com/119)
