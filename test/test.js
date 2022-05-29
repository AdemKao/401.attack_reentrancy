const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy", () => {
  let deployer, user, attacker;

  beforeEach(async () => {
    [deployer, user, attacker] = await ethers.getSigners();

    const BankFactory = await ethers.getContractFactory("Bank", deployer);
    this.bankContract = await BankFactory.deploy();
    // console.log(`Before Bank's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);

    await this.bankContract.deposit({ value: ethers.utils.parseEther("100") });
    await this.bankContract.connect(user).deposit({ value: ethers.utils.parseEther("50") });

    const AttackerFactory = await ethers.getContractFactory("Attacker", attacker);
    this.attackerContract = await AttackerFactory.deploy(this.bankContract.address);
    // console.log("attackerContract", this.attackerContract.address);
    // console.log("bankContract", this.bankContract.address);
    // console.log(`After Bank's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
  });
  describe("Test deposit and withdraw of Bank contract", () => {
    it("Should accept deposits", async () => {
      const deployerBalance = await this.bankContract.balanceOf(deployer.address);
      expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));
      //   console.log("deployerBalance", deployerBalance);

      const userBalance = await this.bankContract.balanceOf(user.address);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
      //   console.log("userBalance", userBalance);
    });

    it("Should accept withdrawals", async () => {
      await this.bankContract.withdraw();

      const deployerBalance = await this.bankContract.balanceOf(deployer.address);
      const userBalance = await this.bankContract.balanceOf(user.address);

      expect(deployerBalance).to.eq(0);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });

    it("Perform Attack", async () => {
      console.log("");
      console.log("*** Before ***");
      console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
      console.log(`Attacker's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

      await this.attackerContract.attack({ value: ethers.utils.parseEther("10") });

      console.log("");
      console.log("*** After ***");
      console.log(`Bank's Balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(this.bankContract.address)).toString()}`);
      console.log(`Attacker's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address)).toString()}`);

      console.log("");

      expect(await ethers.provider.getBalance(this.bankContract.address)).to.eq(0);
    });
  });
});
