## Node 실습

### 4강 Vue, Spring & Cloud 풀스택 과정

Node 실행 명령어

```bash
# Node 실행
node app.js

# 변경된 파일 추가
git add 파일명

# 커밋 생성
git commit -m "commit 메세지"

# 원격 저장소(main 브랜치)로 푸시
git push origin main

# 원격 저장소(main 브랜치)에서 변경사항 가져오기
git pull origin main
```

| 명령어                     | 설명                                    |
| -------------------------- | --------------------------------------- |
| `git status`               | 현재 변경된 파일 상태 확인              |
| `git add 파일명`           | 특정 파일을 스테이징 영역에 추가        |
| `git add .`                | 모든 변경된 파일을 스테이징 영역에 추가 |
| `git commit -m "메세지"`   | 커밋 생성 (변경사항 저장)               |
| `git log`                  | 커밋 내역 확인                          |
| `git push origin main`     | 로컬 커밋을 원격 저장소(main)에 반영    |
| `git pull origin main`     | 원격 저장소의 최신 내용을 가져와 병합   |
| `git clone [URL]`          | 원격 저장소를 로컬로 복제               |
| `git branch`               | 브랜치 목록 확인                        |
| `git checkout -b 브랜치명` | 새 브랜치 생성 후 이동                  |
| `git merge 브랜치명`       | 다른 브랜치를 현재 브랜치에 병합        |
