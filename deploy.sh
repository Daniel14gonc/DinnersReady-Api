echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install


echo "NVM fix"
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

echo "Run new PM2 action"
npm run deploy