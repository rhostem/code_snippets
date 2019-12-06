# production 사이트에서 사용. 모든 크롤링 허용
rm robots.txt
echo -e "User-agent: *\nDisallow:" > robots.txt