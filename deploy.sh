echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Build your app"
sudo npm run dev

echo "Run new PM2 action"
sudo pm2 restart --name "Dinners"