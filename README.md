### Setup truffle init
```powershell
truffle init
// architecture
401.attack_reentrancy 
├── contracts
│   └── Migrations.sol
├── migrations        
│   └── 1_initial_migration.js
├── README.md
├── test
└── truffle-config.js
```
### install package
```powershell
npm install --save-dev @nomiclabs/hardhat-ethers 
@nomiclabs/hardhat-waffle 
chai 
ethereum-waffle 
ethers
```
### install harthat
```powershell
npm init -y
npm install --save-dev hardhat
// architecture
401.attack_reentrancy
├── node_modules
├── contracts
│   ├── Attacker.sol
│   ├── Bank.sol
│   ├── Migrations.sol
│   └── Utils.sol
├── migrations
│   └── 1_initial_migration.js
├── package-lock.json
├── package.json
├── README.md
├── test
│   └── test.js
└── truffle-config.js
```
### Create harthat.config
```powershell
npx hardhat

888    888                      888 888               888
888    888                      888 888               888   
888    888                      888 888               888   
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888   
888    888 .d888888 888    888  888 888  888 .d888888 888   
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b. 
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.9.6

√ What do you want to do? · Create an empty hardhat.config.js
Config file created
```
choose Create empty harthat.config.js
### setup hardhat.config.js
```javascript

```
### Create Bank.sol
### Create Attack.sol
### Create test.js
### Excute test with harthat-test
```powershell
npx hardhat test
```