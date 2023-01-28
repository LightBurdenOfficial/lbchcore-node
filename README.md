LBChcore Node
============

A LBCH full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install lbch-bitcore https://github.com/LightBurdenOfficial/lbch-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install lbchcore-node  

    ```bash
    npm i https://github.com/LightBurdenOfficial/lbchcore-node.git#master

    $(npm bin)/lbchcore-node create mynode

    cd mynode

    ```  
5. Edit lbchcore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "lbchd",
        "web"
      ],
      "servicesConfig": {
        "lbchd": {
          "spawn": {
            "datadir": "/home/user/.lbch",
            "exec": "/home/user/lbch-bitcore/src/lbchd"
          }
        }
      }
	}
    ```  
6. Edit lbch.conf  

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
7. Run Node  

    ```
    $(npm bin)/lbchcore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of LBChcore:

- [LBCH Insight API](https://github.com/LightBurdenOfficial/insight-api)
- [LBCH Explorer](https://github.com/LightBurdenOfficial/lbch-explorer)

## Contributing



## License
