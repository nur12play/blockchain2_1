const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("AssemblyDemo", function () {
  let demo, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const Demo = await ethers.getContractFactory("AssemblyDemo");
    demo = await Demo.deploy();
    await demo.waitForDeployment();
  });

  it("compares caller functions", async function () {
    expect(await demo.getCallerSolidity()).to.equal(owner.address);
    expect(await demo.getCallerAssembly()).to.equal(owner.address);
  });

  it("compares power of two checks", async function () {
    expect(await demo.isPowerOfTwoSolidity(8)).to.equal(true);
    expect(await demo.isPowerOfTwoAssembly(8)).to.equal(true);

    expect(await demo.isPowerOfTwoSolidity(10)).to.equal(false);
    expect(await demo.isPowerOfTwoAssembly(10)).to.equal(false);
  });

  it("compares storage access", async function () {
    let tx1 = await demo.setStoredValueSolidity(42);
    let rc1 = await tx1.wait();
    console.log("setStoredValueSolidity gas:", rc1.gasUsed.toString());

    let tx2 = await demo.setStoredValueAssembly(55);
    let rc2 = await tx2.wait();
    console.log("setStoredValueAssembly gas:", rc2.gasUsed.toString());

    expect(await demo.getStoredValueAssembly()).to.equal(55);
  });
});