USER=ec2-user
HOST=123.123.123.123
DEST_APP=/home/ec2-user/guhada_web

rsync -arv -progress --delete -e "ssh -i ~/.ssh/id_rsa.pub" --exclude-from './.rsyncignore' ./ $USER@$HOST:$DEST_APP
