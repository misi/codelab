# Knockplop https://github.com/so010/knockplop

## Clone and install

cd .. to codlab root

```
cd ..

git clone https://github.com/so010/knockplop.git
cd knockplop
yarn install
sudo global add gulp
```

## Configure:

```
cp server-config.js.dist server-config.js

cp client-config.js.dist client-config.js
```

### Configure Cert

Copy certs
```
../utils/certcopy.sh
```
Configure cert and privte key in server-config.js

### Configure TURN service. 

Goto https://turn.geant.org to acquire credential (REST)
After you have acquired the key edit server-config.js
