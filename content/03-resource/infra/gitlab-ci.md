---
title: gitlab ci
date: 2022-01-11 23:01:57
category: infra
tags: []
draft: true
---

```yml
# .gitlab-ci.yml

### GitLab CI useful tips ######################################################
# Official reference: https://docs.gitlab.com/ee/ci/yaml
#
# 1. gitlab-ci.yml 파일에서 '&', '*' 및 '<<'을 사용하여 코드의 중복을 줄일 수 있습니다.
# https://docs.gitlab.com/ee/ci/yaml/#yaml-specific-features
#
# 2. '.'으로 시작하는 job의 경우 gitlab-ci에서 처리되지 않습니다.
# 해당 기능을 사용해 job이 동작하지 않게 하거나 템플릿으로 활용할 수 있습니다.
# https://docs.gitlab.com/ee/ci/yaml/#hide-jobs
#
# 3. YAML의 anchors(&) 기능을 속성을 복제하거나 상속할 수 있어 코드의 중복을 줄일 수 있습니다.
# '&'을 사용해 anchor의 이름을 설정하고 '<<'를 사용해 내용을 병합하거나, '*'를 사용해 해당 속성을
# 참조하게 할 수 있습니다.
# https://docs.gitlab.com/ee/ci/yaml/#anchors
#
################################################################################

# 파이프라인에서 사용할 cache를 설정합니다.
.use-cache:
  cache:
    key:
      files:
        - .gitlab/ci.yml
        - package-lock.json # npm 을 사용하는 프로젝트의 경우 적용
        # - pnpm-lock.yaml # pnpm 을 사용하는 프로젝트의 경우 적용
    paths:
      - ./**/node_modules/**/* # node 를 사용하는 프로젝트의 경우 적용
      - ./**/coverage/**/* # test coverage 를 사용하는 프로젝트의 경우 적용
      - ./**/.npm # npm 을 사용하는 프로젝트의 경우 적용
      # - ./**/.pnpm # pnpm 을 사용하는 프로젝트의 경우 적용
    policy: pull

# 모든 job 에 기본적으로 설정되는 내용을 넣습니다.
# https://docs.gitlab.com/ee/ci/yaml/#custom-default-keyword-values
default:
  # 최신 version image 에 대해서는 build-kit change log 를 확인해 주세요.
  # https://git.baemin.in/cpd/ci/woowahan-images/-/blob/master/buildkit/CHANGELOG.md
  # node(can be set from NODE_VERSION env)
  # node.js@16.20.2, npm@8.19.4 included
  # node.js@18.19.0, npm@10.2.3 included
  # node.js@20.10.0, npm@10.2.3 included
  image: wcr.baemin.in/platform/buildkit:0.6.0

variables:
  NODE_VERSION: 18.19.0
  DOCKER_REGISTRY: wcr.baemin.in
  DOCKER_DEFAULT_PLATFORM: linux/amd64,linux/arm64

stages:
  - init
  - build
  - verification
  - post-verification
  # - notify
  - deploy-beta
  - deploy-prod

# wildcard 기능은 gitlab 13.12 이상부터 지원
# https://about.gitlab.com/releases/2021/05/22/gitlab-13-12-released/#support-wildcards-when-including-yaml-cicd-configuration-files
include:
  - .gitlab/ci/init.gitlab-ci.yml
  - .gitlab/ci/build.gitlab-ci.yml
  - .gitlab/ci/verification.gitlab-ci.yml
  - .gitlab/ci/post-verification.gitlab-ci.yml
  # - .gitlab/ci/notify.gitlab-ci.yml
  - .gitlab/ci/deploy-beta.gitlab-ci.yml
  - .gitlab/ci/deploy-prod.gitlab-ci.yml
```

```yml
# init.gitlab-ci.yml

# CI 파이프라인을 초기화합니다.
init:
  stage: init
  extends: .use-cache
  cache:
    policy: push
  script:
    - node -v
    - npm -v # npm 을 사용하는 프로젝트의 경우 적용
    - npm install # npm 을 사용하는 프로젝트의 경우 적용
    # - pnpm -v # pnpm 을 사용하는 프로젝트의 경우 적용
    # - pnpm install # pnpm 을 사용하는 프로젝트의 경우 적용
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
    - if: '$CI_COMMIT_BRANCH'
      when: always
```

```yml
# build.gitlab-ci.yml

# 코드를 빌드하고, 빌드된 artifact 를 다음 job 에서 사용할 수 있도록 artifacts 에 설정합니다.
build:
  stage: build
  extends: .use-cache
  needs:
    - init
  script:
    - npm run build:all
  only:
    refs:
      - merge_requests
  except:
    variables:
      - $CI_MERGE_REQUEST_TITLE =~ /^Draft:.*/
      - $CI_MERGE_REQUEST_TITLE =~ /^WIP:.*/
```

```yml
# verification.gitlab-ci.yml

# ktlint check 를 실행합니다.
lint-check:
  stage: verification
  extends: .use-cache
  needs:
    - init
  script:
    - npm run lint
  only:
    refs:
      - merge_requests
  except:
    variables:
      - $CI_MERGE_REQUEST_TITLE =~ /^Draft:.*/
      - $CI_MERGE_REQUEST_TITLE =~ /^WIP:.*/

# unit test 를 실행 합니다
unit-test:
  stage: verification
  extends: .use-cache
  needs:
    - init
  cache:
    policy: pull-push
  script:
    - npm run test:cov
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
  only:
    refs:
      - merge_requests
  except:
    variables:
      - $CI_MERGE_REQUEST_TITLE =~ /^Draft:.*/
      - $CI_MERGE_REQUEST_TITLE =~ /^WIP:.*/
# integration test 를 실행합니다.
# 빠른 속도를 위해 build 는 gradle -x 옵션으로 재실행하지 않습니다.
# include:
#   - remote: 'https://git.baemin.in/engineers/woowa-initializr-infra/-/raw/master/infra/docker-compose.gitlab-ci.yml'
# integration-test:
#   stage: verification
#   extends:
#     - .use-cache
#     - .set-up-infra
#   variables:
#     MYSQL_ROOT_PASSWORD: local
#     MYSQL_DATABASE: initializr
#   script:
#     - ./gradlew intTest -x classes -x testClasses -x jar --stacktrace
#   artifacts:
#     when: always
#     paths:
#       - ./**/build/**/*
#     reports:
#       junit: ./**/build/test-results/**/*.xml
```

```yml
# post-verification.gitlab-ci.yml

# sonarqube 에 verification 결과를 upload 합니다.
upload-to-sonar:
  extends: .use-cache
  stage: post-verification
  needs:
    - init
    - unit-test
    # - integration-test
  script:
    - |
      npm run sonar:mr -- \
      --token=$SONAR_TOKEN \
      --key=$CI_MERGE_REQUEST_IID \
      --source=$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME \
      --target=$CI_MERGE_REQUEST_TARGET_BRANCH_NAME
  only:
    refs:
      - merge_requests
  except:
    variables:
      - $CI_MERGE_REQUEST_TITLE =~ /^Draft:.*/
      - $CI_MERGE_REQUEST_TITLE =~ /^WIP:.*/
```

```yml
# notify.gitlab-ci.yml

# Slack 으로 파이프라인 결과를 전달합니다.
# Settings > CI/CD > Variables 를 통해 slack 관련 환경변수를 설정합니다.
# example:
#   GITLAB_API_TOKEN: Gyx1WZpxTGsYJLbxxxxx
#   SLACK_CHANNEL: alarm-gitlab-runner
#   SLACK_WEBHOOK_URL: https://hooks.slack.com/services/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
notify-success:
  stage: notify
  dependencies: []
  rules:
    - when: on_success
  script:
    - |
      GIT_API_URL=https://git.baemin.in/api/v4/projects/${CI_PROJECT_ID}
      OPTIONS=(-H "PRIVATE-TOKEN: $GITLAB_API_TOKEN")
      PIPELINE_INFO=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}")
      TEST_COVERAGE=$(jq -r '.coverage' <<< "${PIPELINE_INFO}")
      TEST_REPORT=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}/test_report")
      TEST_REPORT_MSG=$(jq -r '. | "\(.total_count) tests / \(.skipped_count) skipped / \(.failed_count) failures / \(.error_count) errors"' <<< $TEST_REPORT)
      SONAR_REPORT_API_URL=https://sonar.baemin.in/api/measures/component?metricKeys=tests,test_failures,bugs,code_smells,line_coverage,branch_coverage,vulnerabilities,duplicated_lines_density
      if [ -z "${CI_MERGE_REQUEST_IID}" ]; then
        SONAR_REPORT=$(curl "${SONAR_REPORT_API_URL}&component=${CI_PROJECT_NAME}&branch=${CI_COMMIT_BRANCH}")
      else
        SONAR_REPORT=$(curl "${SONAR_REPORT_API_URL}&component=${CI_PROJECT_NAME}&pullRequest=${CI_MERGE_REQUEST_IID}")
      fi
      SONAR_REPORT_MSG=$(jq -r '.component.measures[] | [.metric, .value] | @tsv' <<< ${SONAR_REPORT} | awk '{ printf "%-30s %s\n", $1, $2}')
    - |
      cat <<EOF > payload.txt
      {
        "channel": "${SLACK_CHANNEL}",
        "attachments": [
          {
            "mrkdwn_in": ["text"],
            "color": "good",
            "author_name": "${GITLAB_USER_NAME} (${GITLAB_USER_LOGIN})",
            "author_link": "https://git.baemin.in/${GITLAB_USER_LOGIN}",
            "title": "${CI_PROJECT_TITLE} Pipeline #${CI_PIPELINE_ID} finished successfully",
            "title_link": "${CI_PIPELINE_URL}",
            "fields": [
              {
                "title": "Branch",
                "value": "<${CI_PROJECT_URL}/-/commits/${CI_COMMIT_REF_NAME}|${CI_COMMIT_REF_NAME}>",
                "short": true
              },
              {
                "title": "Commit",
                "value": "<${CI_PROJECT_URL}/-/commit/${CI_COMMIT_SHA}|${CI_COMMIT_TITLE}>",
                "short": true
              },
              {
                "title": "Sonar report",
                "value": "<https://sonar.baemin.in/dashboard?id=${CI_PROJECT_NAME}&branch=${CI_COMMIT_BRANCH}|${TEST_COVERAGE}>",
                "short": true
              },
              {
                "title": "Test report (unit, integration)",
                "value": "<${CI_PIPELINE_URL}/test_report|${TEST_REPORT_MSG}>",
                "short": true
              },
              {
                "title": "Sonarqube Report",
                "value": "\`\`\`${SONAR_REPORT_MSG}\`\`\`",
                "short": false
              }
            ],
            "footer": "${CI_PROJECT_NAME}"
          }
        ]
      }
      EOF
    - export PAYLOAD=`cat payload.txt` && echo ${PAYLOAD}
    - |
      if [ -z "SLACK_CHANNEL" ] || [ -z "$SLACK_WEBHOOK_URL" ] || [ -z "$PAYLOAD" ]; then
          echo "Missing argument(s) - set SLACK_CHANNEL, PAYLOAD and SLACK_WEBHOOK_URL environment variable."
      else
          curl -X POST --data-urlencode "payload=$PAYLOAD" "$SLACK_WEBHOOK_URL"
      fi

notify-failure:
  stage: notify
  rules:
    - when: on_failure
  script:
    - |
      GIT_API_URL=https://git.baemin.in/api/v4/projects/${CI_PROJECT_ID}
      OPTIONS=(-H "PRIVATE-TOKEN: $GITLAB_API_TOKEN")
      PIPELINE_INFO=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}")
    - |
      cat <<EOF > payload.txt
      {
        "channel": "${SLACK_CHANNEL}",
        "attachments": [
          {
            "mrkdwn_in": ["text"],
            "color": "danger",
            "author_name": "${GITLAB_USER_NAME} (${GITLAB_USER_LOGIN})",
            "author_link": "https://git.baemin.in/${GITLAB_USER_LOGIN}",
            "title": "${CI_PROJECT_TITLE} Pipeline #${CI_PIPELINE_ID} failed",
            "title_link": "${CI_PIPELINE_URL}",
            "fields": [
              {
                "title": "Branch",
                "value": "<${CI_PROJECT_URL}/-/commits/${CI_COMMIT_REF_NAME}|${CI_COMMIT_REF_NAME}>",
                "short": true
              },
              {
                "title": "Commit",
                "value": "<${CI_PROJECT_URL}/-/commit/${CI_COMMIT_SHA}|${CI_COMMIT_TITLE}>",
                "short": true
              },
            ],
            "footer": "${CI_PROJECT_NAME}"
          }
        ]
      }
      EOF
    - export PAYLOAD=`cat payload.txt` && echo ${PAYLOAD}
    - |
      if [ -z "SLACK_CHANNEL" ] || [ -z "$SLACK_WEBHOOK_URL" ] || [ -z "$PAYLOAD" ]; then
          echo "Missing argument(s) - set SLACK_CHANNEL, PAYLOAD and SLACK_WEBHOOK_URL environment variable."
      else
          curl -X POST --data-urlencode "payload=$PAYLOAD" "$SLACK_WEBHOOK_URL"
      fi
```

```yml
# deploy-prod.gitlab-ci.yml

# develop/beta 환경에 배포를 연동합니다.
# 배포를 연동하기 위해서는 simploy jenkins 에서 deploy job 설정을 추가로 해주어야 합니다.
# simploy jenkins 에서 deploy job 연동하는 부분은 아래 위키를 참고해 주세요.
# https://wiki.woowa.in/x/FKD3Gg
# Settings > CI/CD > Variables 를 통해 simploy 관련 환경변수(SIMPLOY_PIPELINE_TOKEN, SIMPLOY_URL)를 설정합니다.
# example:
#   SIMPLOY_PIPELINE_TOKEN: token
#   SIMPLOY_URL: https://p02.deploy.betabaemin.in/buildByToken/buildWithParameters?job=woowa-initializr.woowa-initializr-web.deploy.pipeline&token=$SIMPLOY_PIPELINE_TOKEN
.deploy-prod:
  stage: deploy-prod
  tags:
    - docker
  script:
    - |
      npm run deploy:docker -- \
      --branch=$CI_COMMIT_BRANCH \
      --role=$Role \
      --zone=prod
  interruptible: true
  rules:
    - if: '$CI_COMMIT_BRANCH == "beta" || $CI_COMMIT_BRANCH =~ /^feature\/.*/ || $CI_COMMIT_BRANCH =~ /^hotfix\/.*/ || $CI_COMMIT_BRANCH =~ /^release\/.*/ || $CI_COMMIT_BRANCH == "main"'
      when: never
      when: manual
      allow_failure: true

deploy-prod batch:
  extends: .deploy-prod
  variables:
    Role: batch

deploy-prod internal-api:
  extends: .deploy-prod
  variables:
    Role: internal-api

deploy-prod public-api:
  extends: .deploy-prod
  variables:
    Role: public-api

deploy-prod webhook:
  extends: .deploy-prod
  variables:
    Role: webhook

```

```js
import sonarqubeScanner from 'sonarqube-scanner';

import { argvToObject } from './util.mjs';

/* .gitlab-ci.yml 에서 아래 값들을 넘겨 받습니다. */
const { token, branch, key, source, target } = argvToObject(process.argv);

sonarqubeScanner(
  {
    options: {
      'sonar.host.url': 'https://sonar.baemin.in',
      'sonar.projectName': 'feops',
      'sonar.projectKey': 'wf-group_feops_server_AY1DgWWRa4U26ZLjMQaQ',
      'sonar.token': token,
      'sonar.sources': 'apps,libs',
      'sonar.tests': 'apps,libs',
      'sonar.inclusions': '**',
      'sonar.test.inclusions': '**/*.test.ts',
      'sonar.qualitygate.wait': 'true',
      'sonar.scm.provider': 'git',
      'sonar.pullrequest.key': key,
      'sonar.pullrequest.branch': source,
      'sonar.pullrequest.base': target,
    },
  },
  () => process.exit(),
);
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: false,
    passWithNoTests: true,
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura', 'lcov'],
    },
  },
});
```
