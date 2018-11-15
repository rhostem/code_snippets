www="/folder/path/to/upload"

rsync -arv -progress -e "ssh -i ~/.ssh/server_name.pem" --exclude-from '.rsyncIgnore' ./dist user@domain.or.ip:$www
