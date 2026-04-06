const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssemblyDemo", function () {
  let assemblyDemo;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const AssemblyDemo = await ethers.getContractFactory("AssemblyDemo");
    assemblyDemo = await AssemblyDemo.deploy();
    await assemblyDemo.waitForDeployment();
  });

  describe("Caller functions", function () {
    it("should return correct caller in Solidity version", async function () {
      const caller = await assemblyDemo.connect(addr1).getCallerSolidity();
      expect(caller).to.equal(addr1.address);
    });

    it("should return correct caller in Assembly version", async function () {
      const caller = await assemblyDemo.connect(addr1).getCallerAssembly();
      expect(caller).to.equal(addr1.address);
    });

    it("should return same caller in Solidity and Assembly", async function () {
      const solidityCaller = await assemblyDemo.connect(addr1).getCallerSolidity();
      const assemblyCaller = await assemblyDemo.connect(addr1).getCallerAssembly();

      expect(solidityCaller).to.equal(assemblyCaller);
    });
  });

  describe("Power of two checks", function () {
    it("should return false for 0", async function () {
      expect(await assemblyDemo.isPowerOfTwoSolidity(0)).to.equal(false);
      expect(await assemblyDemo.isPowerOfTwoAssembly(0)).to.equal(false);
    });

    it("should return true for powers of two", async function () {
      const values = [1, 2, 4, 8, 16, 32, 64, 128];

      for (const value of values) {
        expect(await assemblyDemo.isPowerOfTwoSolidity(value)).to.equal(true);
        expect(await assemblyDemo.isPowerOfTwoAssembly(value)).to.equal(true);
      }
    });

    it("should return false for non-powers of two", async function () {
      const values = [3, 5, 6, 7, 9, 10, 12, 15];

      for (const value of values) {
        expect(await assemblyDemo.isPowerOfTwoSolidity(value)).to.equal(false);
        expect(await assemblyDemo.isPowerOfTwoAssembly(value)).to.equal(false);
      }
    });

    it("should match Solidity and Assembly results for several numbers", async function () {
      const values = [0, 1, 2, 3, 4, 5, 7, 8, 12, 16, 18, 32, 100];

      for (const value of values) {
        const solidityResult = await assemblyDemo.isPowerOfTwoSolidity(value);
        const assemblyResult = await assemblyDemo.isPowerOfTwoAssembly(value);

        expect(assemblyResult).to.equal(solidityResult);
      }
    });
  });

  describe("Storage operations", function () {
    it("should set storedValue using Solidity setter", async function () {
      await assemblyDemo.setStoredValueSolidity(42);
      expect(await assemblyDemo.storedValue()).to.equal(42);
    });

    it("should set storedValue using Assembly setter", async function () {
      await assemblyDemo.setStoredValueAssembly(99);
      expect(await assemblyDemo.storedValue()).to.equal(99);
    });

    it("should read storedValue using Assembly getter after Solidity setter", async function () {
      await assemblyDemo.setStoredValueSolidity(123);
      expect(await assemblyDemo.getStoredValueAssembly()).to.equal(123);
    });

    it("should read storedValue using public getter after Assembly setter", async function () {
      await assemblyDemo.setStoredValueAssembly(777);
      expect(await assemblyDemo.storedValue()).to.equal(777);
    });

    it("should overwrite storedValue correctly", async function () {
      await assemblyDemo.setStoredValueSolidity(10);
      expect(await assemblyDemo.getStoredValueAssembly()).to.equal(10);

      await assemblyDemo.setStoredValueAssembly(55);
      expect(await assemblyDemo.storedValue()).to.equal(55);
      expect(await assemblyDemo.getStoredValueAssembly()).to.equal(55);
    });
  });
});