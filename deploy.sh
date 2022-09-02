echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Run new PM2 action"

if ! type pm2 > /dev/null
then
    sudo npm install -g pm2
else
    pm2 restart index
fi
