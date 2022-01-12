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


notify:
  stage: notify
  rules:
    - when: always
      allow_failure: true
  before_script:
    - export CHANNEL=#alarm-pay-platform-front-beta
    - export CI_SLACK_WEBHOOK_URL=YOUR_WEBHOOK_URL
    - export GIT_API_URL=https://git.baemin.in/api/v4/projects/${CI_PROJECT_ID}
  script:
    - |
      OPTIONS=(-H "PRIVATE-TOKEN: $GITLAB_API_TOKEN")
      PIPELINE_INFO=$(curl "${OPTIONS[@]}" "${GIT_API_URL}/pipelines/${CI_PIPELINE_ID}")
    - |
      cat <<EOF > payload.txt
      {
        "channel": "${CHANNEL}",
        "attachments": [
          {
            "mrkdwn_in": ["text"],
            "color": "#36a64f",
            "author_name": "${GITLAB_USER_NAME} (${GITLAB_USER_LOGIN})",
            "author_link": "https://git.baemin.in/${GITLAB_USER_LOGIN}",
            "title": "Pipeline #${CI_PIPELINE_ID} finished",
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
                "title": "Mentioning users",
                "value": "<@->",
                "short": true
              },
              {
                "title": "Sonar report",
                "value": "-",
                "short": true
              }
            ],
            "footer": "${CI_PROJECT_NAME} "
          }
        ]
      }
      EOF
    - export PAYLOAD=`cat payload.txt` && echo ${PAYLOAD}
    - |
      curl -X POST --data-urlencode "payload=$PAYLOAD" "$CI_SLACK_WEBHOOK_URL"
  interruptible: true

deploy:
  stage: deploy
  script:
    - echo ${BRANCH}
    - if [[ -n ${BRANCH} ]]; then echo ${BRANCH}; else BRANCH="master"; fi
    - echo ${BRANCH}
    - curl https://-/buildWithParameters?deployment_branch="${BRANCH}" --user ${JENKINS_TOKEN}  --data verbosity=high
  when: manual
```