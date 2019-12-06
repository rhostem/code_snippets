# development 사이트에서 사용. 모든 크롤링 거부
rm robots.txt
echo -e "User-agent: *\nDisallow: /" > robots.txt