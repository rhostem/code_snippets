# 배포 스크립트
APP_NAME=web-dev
HOST=123.123.123.123
USER=ec2-user
REPOSITORY=git@github.com:username/reponame.git
BRANCH=develop
DEST_REPO=/home/ec2-user/reponame

# 서버 접속 후 앱 설치 및 재시작 시작
# reset --hard 로 현재 변경사항을 모두 초기화, git remote update --prune 으로 브랜치 정리 및 fetch 과정이 선행된다.
ssh -i ~/.ssh/guhada.pem $USER@$HOST "cd $DEST_REPO && git reset --hard && git remote update --prune && git checkout $BRANCH && git pull && npm install && npm run build && pm2 flush && pm2 reload ecosystem.config.js --only $APP_NAME --env production"

