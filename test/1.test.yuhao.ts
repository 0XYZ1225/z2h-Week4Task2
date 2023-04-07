// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("yuhao", function () {
  let yuhao:Contract;

  beforeEach(async function () {
    const Yuhao = await ethers.getContractFactory("Yuhao");
    yuhao = await Yuhao.deploy();
    await yuhao.deployed();
  })

  it("should retrieve value previously stored", async function () {
    await yuhao.setValue(42);
    expect(await yuhao.retrieve()).to.equal(BigNumber.from('42'));

    await yuhao.setValue(100);
    expect(await yuhao.retrieve()).to.equal(BigNumber.from('100'));
  })
})