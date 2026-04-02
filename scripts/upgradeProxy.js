const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

  const LogicV2 = await ethers.getContractFactory("LogicV2");

  const upgraded = await upgrades.upgradeProxy(proxyAddress, LogicV2);

  console.log("Upgraded!");
}

main();