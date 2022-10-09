export PATH=$PATH:/usr/bin/pm2

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Run new PM2 action"
pm2 list