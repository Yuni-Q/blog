---
monthly-summary: 
tags:
  - monthly
---
```tracker 
searchType: frontmatter
searchTarget: exercise 
folder: content/planner/daily
datasetName: 운동 습관 기르기 
month: 
	startWeekOn: 'mon' 
	headerMonthColor: orange 
	initMonth: <% tp.file.title %> 
	mode: annotation
	annotation: 💪 
```
```tracker
searchType: frontmatter 
searchTarget: reading_page 
datasetName: 읽은 페이지 
folder: content/planner/daily 
startDate: <%* const title = tp.file.title; const firstDay = moment(title + "-01").format('YYYY-MM-DD(ddd)'); tR += firstDay; %> 
endDate: <%* const year = tp.file.title.split("-")[0]; const month = tp.file.title.split("-")[1]; const lastDay = moment(title).endOf('month').format('YYYY-MM-DD(ddd)'); tR += lastDay; 
%> 

summary: 
	template: "적게 읽은 날: {{min()::i}}페이지\n많이 읽은 날: {{max()::i}}페이지\n독서한 날: {{numDaysHavingData()::i}}일" 
```
