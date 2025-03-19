---
cssclasses: dashboard
---
> [!multi-column]
>> [!NOTE] 오늘 할일
>> ```tasks
>> due today
>> hide backlink
>> hide due date
>> hide edit button
>> ```
>
>> [!note] 높은 우선 순위
>> ```tasks
>> priority is high
>> not done
>> hide tags
>> hide backlink
>> hide due date
>> hide edit button
>> ```
>

## 독서
- 📗 현재 읽고 있는 책
	 - [[노트1]]
	 - [[노트2]]
- 📕 앞으로 읽을 책
	 - [[노트3]]
	 - [[노트4]]
- 📘 독서 노트
	 - [[독서 노트 작성]]

## 학습
- 💻 코딩 공부
	 - [[자바스크립트 기초]]
	 - [[파이썬 기초]]
- 💜 옵시디언
	 - [[Dataview 플러그인]]
	 - [[Templater 플러그인]]

## 유튜브
- 🗒 기획
	 - [[03_옵시디언 꾸미기]]
- 🎥 촬영
	 - [[02_CSS 적용하기]]
- 🖥 편집
	 - [[01_플러그인 활용]]

## 노트 리스트
- 🗃 최근 수정한 노트
  `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- 📝 최근 작성한 노트
  `$=dv.list(dv.pages('').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 📁 폴더: 폴더명
  `$=dv.list(dv.pages('"폴더명"').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 🔖 태그: 태그명
  `$=dv.list(dv.pages('#태그명').sort(f=>f.file.name,"desc").limit(5).file.link)`
- ✅ 완료: 프로젝트
  `$=dv.list(dv.pages('').where(p => p.source === "값").sort(f=>f.file.name, "asc").limit(5).file.link)`