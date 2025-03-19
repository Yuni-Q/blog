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
	 - [[밸류 프로포지션 디자인 가치 제안 설계로 시작하라]]
	 - [[오브젝트 코드로 이해하는 객체지향 설계]]
- 📕 앞으로 읽을 책
	 - [[책]]

## 학습
- 💻 코딩 공부
	 - [[유니티]]
- 💜 옵시디언
	 - [[Dataview 플러그인]]


## 노트 리스트
- 🗃 최근 수정한 노트
  `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
- 📝 최근 작성한 노트
  `$=dv.list(dv.pages('').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 📁 폴더: projects
  `$=dv.list(dv.pages('"01-projects"').sort(f=>f.file.ctime.ts,"desc").limit(5).file.link)`
- 🔖 태그: project
  `$=dv.list(dv.pages('#project').sort(f=>f.file.name,"desc").limit(5).file.link)`
- ✅ 완료: 프로젝트
  `$=dv.list(dv.pages('').where(p => p.source === "project").sort(f=>f.file.name, "asc").limit(5).file.link)`