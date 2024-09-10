# 기본 규칙

- main에 push 또는 pullrequest 하지말 것
- 본인의 branch외에는 push 하지말 것


# commit 방식

(본인이 만들고 있는 기능) (현재기능의 상태) (본인의 이름) <br>
ex) 로그인기능 진행중 백지민 <br>
    메인페이지ui 완료 백지민


# git 명령어 

### 설정에 대한 git 명령어
- `git init` : 해당 폴더를 git으로 관리하겠다는 시작 명령어
- `git remote add origin {해당 github프로젝트 url}` : origin이라는 이름으로 해당 github프로젝트를 원격(remote)으로 조정하겠다는 명령어 → origin은 다른 이름으로 변경가능

### local의 프로젝트를 저장하고 remote(원격저장소 github)에 올리는 명령어
- `git add .` :  현재 프로젝트를 저장시키는 명령어
- `git commit -m ‘버전의 이름’` : 현재 프로젝트를 git에 '버전이름'을 설정해서 log를 남기는 명령어
- `git push origin {본인의 branch이름}` : 해당 github에 본인의 branch에 코드를 올리는 명령어

### branch를 이동하거나 본인의 log를 볼때 사용하는 명령어
- `git log` : 본인이 commit한 log를 볼수있는 명령어
- `git staus` : 본인의 현재 프로젝트의 상태(?)를 볼 수 있는 명령어 add가 된 파일들 혹은 되지않은 파일들을 볼 수 있음..
- `git branch` : 본인의 local에 있는 branch들을 볼 수 있는 명령어 
- `git branch {생성할 branch 이름}` : 본인의 local에 branch를 만드는 명령어
- `git branch -r` : 본인의 remote(원격저장소 github)에 있는 branch들을 볼 수 있는 명령어 
- `git checkout {변경할 branch 이름}` : 이름에 해당하는 branch로 이동할수 있는 명령어 

### remote(원격저장소 github)에 있는 프로젝트를 가져오는 명령어
- `git pull origin {코드를 가져올 branch이름}` : 본인의 local코드에 remote(원격저장소 github)에 있는 코드를 합치는 명령어
- `git clone (github에서 프로젝트의 주소)` : 해당 github의 주소에 해당하는 프로젝트를 다운로드해오는 명령어


## 만약에 본인의 local코드가 본인의 github branch에 push되지 않을경우에는 본인의 branch에 해당하는 코드를 pull 하고 다시 push 진행하기 
`git pull origin {코드를 가져올 branch이름}` -> `git push origin {본인의 branch이름}`