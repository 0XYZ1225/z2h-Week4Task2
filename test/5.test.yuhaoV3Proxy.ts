import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("yuhao (proxy) V3 with name", function () {
  let yuhao:Contract
  let yuhaoV2:Contract
  let yuhaoV3:Contract

  beforeEach(async function () {
    const Yuhao = await ethers.getContractFactory("Yuhao");
    const YuhaoV2 = await ethers.getContractFactory("YuhaoV2");
    const YuhaoV3 =  await ethers.getContractFactory("YuhaoV3");

    //initialize with 42
    yuhao = await upgrades.deployProxy(Yuhao, [42], {initializer: 'setValue'});
    yuhaoV2 = await upgrades.upgradeProxy(yuhao.address, YuhaoV2);
    yuhaoV3 = await upgrades.upgradeProxy(yuhao.address, YuhaoV3);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //查看v2里的value是不是 v1里的初始值
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('42'));
    //在v3执行+1 
    await yuhaoV3.increment();
    //查看v2 里边是不是43
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('43'));

    //在v2里设置value为100
    await yuhaoV2.setValue(100);
    //查看v2 里的值是不是100
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('100'));
  })

  it("should set name correctly in V3", async function () {
    expect(await yuhaoV3.name()).to.equal("");

    const boxname="my Yuhao V3";
    await yuhaoV3.setName(boxname);
    expect(await yuhaoV3.name()).to.equal(boxname);
  })

})