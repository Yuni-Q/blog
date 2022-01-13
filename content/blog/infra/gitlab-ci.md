---
title: gitlab ci
date: 2022-01-11 23:01:57
category: infra
tags: []
draft: true
---

## push
```yml
workflow:
  rules:
    - if: '$CI_COMMIT_BRANCH =~ /.+feature\/.*/'

default:
  image: -

cache:
  key:
    files:
      - package.json
  paths:
    - node_modules/

stages:
  - install
  - build
  # - test
  - post-verification
  - notify
  - deploy

install:
  stage: install
  script:
    - node --version
    - npm -v
    - npm install
    - npx tsc -v
  interruptible: true

# test:
#   stage: test
#   script:
#     - npm run test:ci
#   artifacts:
#     when: always
#     reports:
#       junit:
#         - junit.xml
#   coverage: '/Statements\s*:\s*([^%]+)/'
#   interruptible: true


upload-to-sonar:
  stage: post-verification
  script:
    - npm run sonar
  interruptible: true

build:
  stage: build
  script:
    - SERVICE_ID=manage npm run build:prod
  interruptible: true


include:
  - local: /.gitlab/notify.gitlab-ci.yml
```

```yaml
notify-success:
  stage: notify
  dependencies: []
  rules:
    - when: on_success
  script:
    - |
      GIT_API_URL=https://github.com/api/v4/projects/${CI_PROJECT_ID}
      OPTIONS=(-H "PRIVATE-TOKEN: $GITLAB_API_TOKEN")
      PIPELINE_INFO=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}")
      TEST_REPORT=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}/test_report")
      SONAR_REPORT=$(curl "https://sonar/api/measures/component?component=ID&metricKeys=tests,test_failures,bugs,code_smells,line_coverage,branch_coverage,vulnerabilities,duplicated_lines_density&branch=${CI_COMMIT_BRANCH}")
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
            "author_link": "https://github.com/${GITLAB_USER_LOGIN}",
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
                "value": "<https://sonar/dashboard?id=ID&branch=${CI_COMMIT_BRANCH}>",
                "short": true
              },
              {
                "title": "Test report (unit, integration)",
                "value": "<${CI_PIPELINE_URL}/test_report|>",
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
      GIT_API_URL=https://github.com/api/v4/projects/${CI_PROJECT_ID}
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
            "author_link": "https://github.com/${GITLAB_USER_LOGIN}",
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