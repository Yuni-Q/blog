
현재 작업을 일시적으로 저장해두고 싶다<br>
```bash
git stash save
```
> save는 생략할 수 있습니다. 또한, save 뒤에 내용을 나타내는 메시지를 지정할 수 있습니다.<br>


일시적으로 저장해 둔 작업 목록을 확인하고 싶다<br>
```bash
git stash list
```

일시적으로 저장해 둔 작업을 되돌리고 싶다.<br>
```bash
git stash pop
```
> 인수를 지정하지 않으면 저장된 작업 목록 중 가장 최신으로 저장된 작업을 복원합니다. stash@{1}과 같이 인수를 지정하면 특정 작업을 선택하여 복원할 수 있습니다.<br>

일시적으로 저장해 둔 작업을 삭제하고 싶다<br>
```bash
git stash drop
```
> 인수를 지정하지 않으면 저장도니 작업 목록 중 가장 최신으로 저장된 작업을 삭제합니다. stash@{1}과 같이 인수를 지정하면 특정 작업을 선택하여 삭제할 수 있습니다.<br>

일시적으로 저장해 둔 작업을 모두 삭제하고 싶다<br>
```bash
git stash clear
```