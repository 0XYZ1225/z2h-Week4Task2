// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("yuhaoV2", function () {
  let yuhaoV2:Contract

  beforeEach(async function () {
    const YuhaoV2 = await ethers.getContractFactory("YuhaoV2")
    yuhaoV2 = await YuhaoV2.deploy()
    await yuhaoV2.deployed()
  });

  it("should retrievevalue previously stored", async function () {
    await yuhaoV2.setValue(42)
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('42'))

    await yuhaoV2.setValue(100)
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('100'))
  });

  it('should increment value correctly', async function () {
    await yuhaoV2.setValue(42)
    await yuhaoV2.increment()
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('43'))

    await yuhaoV2.reduce()
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('42'))
  })
})