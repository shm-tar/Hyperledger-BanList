# Hyperledger-BanList
<img src="https://github.com/shm-tar/Hyperledger-BanList/blob/master/arch.png?raw=true">
A simple business network built with:
* Hyperledger Fabric
* Hyperledger Composer
* Yeoman
## Setup
If you're running on Ubuntu, you can download the prerequisites using the following commands:
```
curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh
chmod u+x prereqs-ubuntu.sh
```
Next run the script - as this briefly uses sudo during its execution, you will be prompted for your password.
```
./prereqs-ubuntu.sh
```
**(!) BE SURE TO INSTALL THE FOLLOWING COMPONENTS WITH 8TH NODE VERSION (!):**</br>
Set the node version globally
```
nvm alias default v8
```
Note that you should not use su or sudo for the following npm commands.</br>
Essential CLI tools:
```
npm install -g composer-cli@0.19
```
Utility for running a REST Server on your machine to expose your business networks as RESTful APIs:
```
npm install -g composer-rest-server@0.19
```
Useful utility for generating application assets:
```
npm install -g generator-hyperledger-composer@0.19
```
Yeoman is a tool for generating applications, which utilises generator-hyperledger-composer:
```
npm install -g yo
```
Install composer playground, browser app for simple editing and testing Business Networks:
```
npm install -g composer-playground@0.19
```
In a directory of your choice, get the .tar.gz file that contains the tools to install Hyperledger Fabric:
```
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
```
A zip is also available if you prefer: just replace the .tar.gz file with fabric-dev-servers.zip and the tar -xvf command with a unzip command in the preceding snippet.</br>

Use the scripts you just downloaded and extracted to download a local Hyperledger Fabric v1.1 runtime:
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv11
./downloadFabric.sh
```
## Running Hyperledger Composer
I recommend exporting `FABRIC_VERSION=hlfv11` globally, because if not the script would assume to use the newest version of hlfv and it would lead to some compatibility problems.</br>
To do this, open your `/etc/environment` file with any editor and paste `FABRIC_VERSION=hlfv11` inside. Reboot. [Tutorial Here](https://stackoverflow.com/questions/13046624/how-to-permanently-export-a-variable-in-linux)</br></br>
The first time you start up a new Hyperledger runtime, you'll need to run the start script, then generate a PeerAdmin card:
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv11
./startFabric.sh
./createPeerAdminCard.sh
```
You can start and stop your runtime using `~/fabric-dev-servers/stopFabric.sh`, and start it again with `~/fabric-dev-servers/startFabric.sh`.</br>

At the end of your development session, run ~/fabric-dev-servers/stopFabric.sh and then ~/fabric-dev-servers/teardownFabric.sh. Note that if you've run the teardown script, the next time you start the runtime, you'll need to create a new PeerAdmin card just like you did on first time startup.
## Creating business networks
To create a new business network, refer to <a href="https://hyperledger.github.io/composer/v0.19/tutorials/developer-tutorial" target="_blank">Hyperledger Developer Tutorial</a>.
## Running the BanList project
To run the repository's project, clone the progect using
```
git clone https://github.com/shm-tar/Hyperledger-BanList
```
Be sure to delete networkadmin.card and noflylist@0.0.6.bna.</br>
### Installing business network
Using the command line, navigate to the Hyperledger-BanList directory.</br>
From the Hyperledger-BanList directory, run the following command:
```
composer archive create -t dir -n .
```
After the command has run, a business network archive file called Hyperledger-BanList@0.0.1.bna should have been created in the Hyperledger-BanList directory.</br>
To install the business network, from the tutorial-network directory, run the following command:
```
composer network install --card PeerAdmin@hlfv1 --archiveFile Hyperledger-BanList@0.0.1.bna
```
The composer network install command requires a PeerAdmin business network card (in this case one has been created and imported in advance), and the the file path of the .bna which defines the business network.</br>

To start the business network, run the following command:
```
composer network start --networkName Hyperledger-BanList --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
The `composer network start` command requires a business network card, as well as the name of the admin identity for the business network, the name and version of the business network and the name of the file to be created ready to import as a business network card.</br>

To import the network administrator identity as a usable business network card, run the following command:
```
composer card import --file networkadmin.card
```
The `composer card import` command requires the filename specified in composer network start to create a card.</br>

To check that the business network has been deployed successfully, run the following command to ping the network:
```
composer network ping --card admin@Hyperledger-BanList
```
### Running REST server
The `composer network ping` command requires a business network card to identify the network to ping.</br>
To create the REST API, navigate to the Hyperledger-BanList directory and run the following command:
```
composer-rest-server -c admin@Hyperledger-BanList -n never -u true -w true
```
Navigate to your web browser (localhost:3000/explorer).
### Installing new version of business network after you made any changes to files inside directory
In the Hyperledger-BanList directory, open the `package.json` file. Update the version property from 0.0.1 to 0.0.2. Using the command line, navigate to the tutorial-network directory.</br>
Run the following command:
```
composer archive create --sourceType dir --sourceName . -a Hyperledger-BanList@0.0.2.bna
```
Switch to the terminal, change directory to the folder containing the Hyperledger-BanList@0.0.2.bna. Run the following command to install the updated business network:
```
composer network install --card PeerAdmin@hlfv1 --archiveFile Hyperledger-BanList@0.0.2.bna
```
Run the following command to upgrade the network to the new version:
```
composer network upgrade -c PeerAdmin@hlfv1 -n tutorial-network -V 0.0.2
```
Check the current version of the business network before continuing by using the following command:
```
composer network ping -c admin@Hyperledger-BanList | grep Business
```
Run composer REST server:
```
composer-rest-server -c admin@Hyperledger-BanList -n never -u true -w true
```
Navigate to your web browser (localhost:3000/explorer).
