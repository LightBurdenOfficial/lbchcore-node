# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop lbchcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/lbchcore-node.git
git clone git@github.com:<yourusername>/lbchcore-lib.git
```

To develop lbch or to compile from source:

```bash
git clone git@github.com:<yourusername>/LBCH.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See lbch documentation for building lbch on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download lbch distribution, you'll need to compile lbchd from source, and setup your configuration to use that version.


We now will setup symlinks in `lbchcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf lbchcore-lib
ln -s ~/lbchcore-lib
rm -rf lbchd-rpc
ln -s ~/lbchd-rpc
```

And if you're compiling or developing LBCH:
```bash
cd ../bin
ln -sf ~/lbch/src/lbchd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd lbchcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/lbchd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/lbchd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch lbchcore-node.json
touch package.json
```

Edit `lbchcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "lbchd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "lbchd": {
      "spawn": {
        "datadir": "/home/<youruser>/.lbch",
        "exec": "/home/<youruser>/lbch/src/lbchd"
      }
    }
  }
}
```

**Note**: To install services [lbch-insight-api](https://github.com/LightBurdenOfficial/insight-api) and [lbch-explorer](https://github.com/LightBurdenOfficial/lbch-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/lbchcore-lib
ln -s ~/lbchcore-node
ln -s ~/lbch-insight-api
ln -s ~/lbch-explorer
```

Make sure that the `<datadir>/lbch.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../lbchcore-node/bin/lbchcore-node start
```