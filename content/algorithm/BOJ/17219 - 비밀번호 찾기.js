// 시간 5초
// 메모리: 256
// 저장된 사이트 주소의 수 N(1 ≤ N ≤ 100,000)
// 밀번호를 찾으려는 사이트 주소의 수 M(1 ≤ M ≤ 100,000)
const input = [
  '16 4',
  'noj.am IU',
  'acmicpc.net UAENA',
  'startlink.io THEKINGOD',
  'google.com ZEZE',
  'nate.com VOICEMAIL',
  'naver.com REDQUEEN',
  'daum.net MODERNTIMES',
  'utube.com BLACKOUT',
  'zum.com LASTFANTASY',
  'dreamwiz.com RAINDROP',
  'hanyang.ac.kr SOMEDAY',
  'dhlottery.co.kr BOO',
  'duksoo.hs.kr HAVANA',
  'hanyang - u.ms.kr OBLIVIATE',
  'yd.es.kr LOVEATTACK',
  'mcc.hanyang.ac.kr ADREAMER',
  'startlink.io',
  'acmicpc.net',
  'noj.am',
  'mcc.hanyang.ac.kr',
];

const map = {};
for (let i = 1; i < input.length; i++) {
  const arr = input[i].trim().split(' ');
  if (arr.length > 1) {
    map[arr[0]] = arr[1];
  } else {
    console.log(map[arr[0]]);
  }
}
