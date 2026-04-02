const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Gas Optimization Comparison", function () {
  let unoptimized, optimized, owner, user1, user2, user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const Unoptimized = await ethers.getContractFactory("UnoptimizedStore");
    unoptimized = await Unoptimized.deploy("Project A", 100000);
    await unoptimized.waitForDeployment();

    const Optimized = await ethers.getContractFactory("OptimizedStore");
    optimized = await Optimized.deploy("Project A", 100000);
    await optimized.waitForDeployment();
  });

  it("compares deposit gas", async function () {
    let tx1 = await unoptimized.connect(user1).deposit(100);
    let rc1 = await tx1.wait();
    console.log("Unoptimized deposit gas:", rc1.gasUsed.toString());

    let tx2 = await optimized.connect(user1).deposit(100);
    let rc2 = await tx2.wait();
    console.log("Optimized deposit gas:", rc2.gasUsed.toString());

    expect(await unoptimized.total()).to.equal(100);
    expect(await optimized.total()).to.equal(100);
  });

  it("compares addManyUsers gas", async function () {
    const users = [user1.address, user2.address, user3.address];

    let tx1 = await unoptimized.addManyUsers(users);
    let rc1 = await tx1.wait();
    console.log("Unoptimized addManyUsers gas:", rc1.gasUsed.toString());

    let tx2 = await optimized.addManyUsers(users);
    let rc2 = await tx2.wait();
    console.log("Optimized addManyUsers gas:", rc2.gasUsed.toString());

    expect((await unoptimized.getUsers()).length).to.equal(3);
    expect((await optimized.getUsers()).length).to.equal(3);
  });
});