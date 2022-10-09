echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Run new PM2 action"
npm install pm2@latest -g
pm2 restart PruebaJack