const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory", function () {
  let factory;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();
  });

  it("should deploy child using create", async function () {
    const tx = await factory.createChild("ChildA", {
      value: ethers.parseEther("1")
    });
    const receipt = await tx.wait();

    console.log("Gas used by create:", receipt.gasUsed.toString());

    const deployed = await factory.getDeployedContracts();
    expect(deployed.length).to.equal(1);
  });

  it("should deploy child using create2", async function () {
    const salt = ethers.keccak256(ethers.toUtf8Bytes("salt-create2"));

    const tx = await factory.createChild2("ChildB", salt, {
      value: ethers.parseEther("1")
    });
    const receipt = await tx.wait();

    console.log("Gas used by create2:", receipt.gasUsed.toString());

    const deployed = await factory.getDeployedContracts();
    expect(deployed.length).to.equal(1);
  });
});