
# Naming

## base
1. 준말(약어)은 지양
1. 데이터와 응용 클래스 분리
1. 상수는 대문자와 '_'로 사용
1. 클래스명은 명사로 작성
1. 데이터의 필드명에 클래스명을 중복을 사용지 않음

## 함수는 간단하게
1. 함수는 4줄이 넘지 않도록
1. 일관된 추상화 수준으로
1. if문은 return과 함께 쓰고 else는 지양
1. 함수 인자는 1개 (또는 0개)
1. null을 반환하거나 null을 전달하지 않도록

## 주석은 반드시 필요한 곳에만
1. 안 쓰는 소스코드는 주석처리 대신 반드시 삭제
1. 최대한 signature로 대체

## 객체
1. 생성자 대신 정적 팩토리 메쏘드
1. 객체 생성을 막을 때는 private 생성자 지정

---
참조 : [카카오헤어샵의 CleanCode](https://brunch.co.kr/@cg4jins/2)