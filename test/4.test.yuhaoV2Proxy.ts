
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("YuhaoV2 (proxy)", function () {
  let yuhao: Contract
  let yuhaoV2: Contract

  beforeEach(async function () {
    const Yuhao = await ethers.getContractFactory("Yuhao"); 
    const YuhaoV2 = await ethers.getContractFactory("YuhaoV2"); 
    //initilize with 42
    yuhao = await upgrades.deployProxy(Yuhao, [42], { initializer: 'initialize' });
    //执行升级
    yuhaoV2 = await upgrades.upgradeProxy(yuhao.address, YuhaoV2);

    console.log(yuhaoV2.address," yuhao/proxy after upgrade");

  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //初始值是不是42
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('42'));

    //执行+1
    await yuhaoV2.increment();
    //result = 42 + 1 = 43
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('43'));

    //设置值为100
    await yuhaoV2.setValue(100);
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('100'));

    //执行-1
    await yuhaoV2.reduce();

    //值为99
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('99'));
  })

})