
openssl genrsa -out makai_.key 2048
openssl req -new -key makai_.key -out makai_.csr


openssl x509 -req -in makai_asg.csr -CA localCA.pem -CAkey localCA.key \
-CAcreateserial -out makai_asg.pem -days 825 -sha256 -extfile makai_asg.ext

