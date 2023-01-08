## Playwright 테스트를 위한 페이지 객체 패턴 및 데이터 기반 매개변수화

### 페이지 객체 패턴이란 무엇이며 어떻게 구현하는가?

```js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
  }

  async goTo() {
    await this.page.goTo('https://rahulshettyacdemy.com/client');
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

test('Client App login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validLogin('yuni', 'password');
});
```

###

### 페이지 객체 만들기 그리고 end to end Script를 위한 방법 - Part 1

- DashboardPage 만들기

### Creating Page objects and action methods for end to end Script - Part 2

```js
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPAge = new DashboardPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPAge;
  }
}

test('Client App login', async ({ page }) => {
  const poManager = new POManager();
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin('yuni', 'password');
});
```

### Assignment Solution - Converting Page object Model Project

- 오프라인에서 코드 위의 방식으로 바꾼 것 설명해 준다.

### 외부 json 파일에서 Playwright 테 스트로 데이터를 구동하는 방법

- json으로 값 분리하는 것을 설명해 준다.

### Implementing Parameterization in running tests with different data sets

- json을 배열로 만들어 테스트 하는 것을 설명해준다. test 이름이 겹치지 않도록 해야 한다고 알려준다.

### How to pass test data as fixture by extend test annotation behaviour

```js
const { base } = require('@playwright/test');

const customTest = base.test.extends({
  testDataForOrder: {
    username: 'anshika@gmail.com',
    password: 'Iamking@000',
    productName: 'Zara Coat 4',
  },
});

customTest('Client App login', async ({ page, testDataForOrder }) => {
  const poManager = new POManager();
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password,
  );
});
```
