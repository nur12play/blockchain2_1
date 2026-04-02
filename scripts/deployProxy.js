const { ethers, upgrades } = require("hardhat");

async function main() {
  const LogicV1 = await ethers.getContractFactory("LogicV1");

  const proxy = await upgrades.deployProxy(LogicV1, [], {
    initializer: "initialize",
    kind: "uups"
  });

  await proxy.waitForDeployment();

  console.log("Proxy deployed to:", await proxy.getAddress());
}

main();
