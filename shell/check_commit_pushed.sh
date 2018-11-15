BRANCH=$(git rev-parse --abbrev-ref HEAD)
HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse --verify origin/$BRANCH)

echo "current branch: ${BRANCH}"
echo "local head commit hash: ${HASH}"
echo "remote head commit hash: ${REMOTE_HASH}"

if [[ "$BRANCH" != "master" ]]; then
  echo 'It is not master branch.';
  exit
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "You should commit all changes before excute this.";
  exit
fi

if [ $HASH != $REMOTE_HASH ]; then
  echo "You should push all commits to remote before excute this."
  exit
fi
