# .next(빌드) 폴더에서 마지막으로 수정한 지 60분 이상인 파일을 모두 삭제한다.
# 디렉토리로 지정하면 css chunks runtime 폴더가 삭제되기 때문에 안됨
# ! 반드시 배포 과정에서 앱이 재실행된 후 실행해야 한다
find ./.next/server/static/* -type f -mmin +60 | xargs rm -rf
find ./.next/static/* -type f -mmin +60 | xargs rm -rf
