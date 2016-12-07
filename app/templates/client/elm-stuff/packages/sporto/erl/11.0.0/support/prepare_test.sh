# nvm use 4.0 # already done in CI
node --version
npm --version
npm install -g elm
cd test
npm install
elm-package install --yes