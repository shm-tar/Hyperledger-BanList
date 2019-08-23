# Hyperledger-BanList

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
**BE SURE TO INSTALL THE FOLLOWING COMPONENTS WITH 8TH NODE VERSION (!):**</br>
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
