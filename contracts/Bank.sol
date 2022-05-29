// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Utils.sol";

contract Bank is ReentrancyGuard {
  using Address for address payable;
  mapping(address => uint256) public balanceOf;

  function deposit() external payable {
    balanceOf[msg.sender] += msg.value;
  }

  // attach nonTrrntrant to protect against reentrancy
  function withdraw() external nonReentrant {
    uint256 depositedAmount = balanceOf[msg.sender];
    payable(msg.sender).sendValue(depositedAmount);
    balanceOf[msg.sender] = 0;
  }
}
