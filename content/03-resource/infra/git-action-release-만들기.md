---
title: git action release 만들기
date: 2022-02-02 16:02:72
category: infra
tags: []
draft: true
---

```yaml
name: Release Tag

# deploy라는 action이 끝나면 실행
on:
  workflow_run:
    workflows: [deploy]
    types: [completed]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: package 버전 정보 추출
        id: version
        run: |
          content=`cat /home/runner/work/blog/blog/package.json`
          # the following lines are only required for multi line json
          content="${content//'%'/'%25'}"
          content="${content//$'\n'/'%0A'}"
          content="${content//$'\r'/'%0D'}"
          # end of optional handling for multi line json
          echo "::set-output name=packageJson::$content"
      - uses: bbonkr/git-tag-check-action@v1.0.5
        name: package에 있는 버전이 레포에 존재하는지 확인
        id: git_tag_check
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          tag: v${{fromJson(steps.version.outputs.packageJson).version}}
      - name: Release 생성
        if: ${{ steps.git_tag_check.outputs.tag == '' }}
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ fromJson(steps.version.outputs.packageJson).version }}
          release_name: Release v${{ fromJson(steps.version.outputs.packageJson).version }}
      - name: Bump version and push tag
        if: ${{ steps.git_tag_check.outputs.tag != '' }}
        uses: mathieudutour/github-tag-action@v5.5
        id: tag_version
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Bump version Release 생성
        if: ${{ steps.git_tag_check.outputs.tag != '' }}
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.tag_version.outputs.new_tag }}
          release_name: Release ${{ steps.tag_version.outputs.new_tag }}
          body: ${{ steps.tag_version.outputs.changelog }}
```