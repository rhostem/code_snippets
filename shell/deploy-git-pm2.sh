# 배포 스크립트
APP_NAME=my-app-name
HOST=1.1.1.1
USER=username
REPOSITORY=git@github.com:/reposutoryname.git
BRANCH=develop
DEST_REPO=/home/username/www

# 서버 접속 후 테스트 앱 시작
ssh -i ~/.ssh/guhada.pem $USER@$HOST "cd $DEST_REPO && git checkout $BRANCH && git reset --hard $BRANCH && git pull && npm install && npm run build && pm2 reload ecosystem.config.js --only $APP_NAME --env production"
