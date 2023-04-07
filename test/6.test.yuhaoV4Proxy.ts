import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("yuhao (proxy) V3 with name", function () {
  let yuhao:Contract;
  let yuhaoV2:Contract;
  let yuhaoV3:Contract;
  let yuhaoV4:Contract;

  beforeEach(async function () {
    const Yuhao = await ethers.getContractFactory("Yuhao");
    const YuhaoV2 = await ethers.getContractFactory("YuhaoV2");
    const YuhaoV3 =  await ethers.getContractFactory("YuhaoV3");
    const YuhaoV4 =  await ethers.getContractFactory("YuhaoV4");

    //initialize with 42
    yuhao = await upgrades.deployProxy(Yuhao, [42], {initializer: 'setValue'});
    yuhaoV2 = await upgrades.upgradeProxy(yuhao.address, YuhaoV2);
    yuhaoV3 = await upgrades.upgradeProxy(yuhao.address, YuhaoV3);
    yuhaoV4 = await upgrades.upgradeProxy(yuhao.address, YuhaoV4);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await yuhaoV4.retrieve()).to.equal(BigNumber.from('42'))
    await yuhaoV4.increment()
    expect(await yuhaoV4.retrieve()).to.equal(BigNumber.from('43'))

    await yuhaoV2.setValue(100)
    expect(await yuhaoV2.retrieve()).to.equal(BigNumber.from('100'))
  })

  it("should setName and getName correctly in V4", async function () {
    //name() removed, getName() now
    // expect(boxV4).to.not.have.own.property("name")
    expect(yuhaoV4.name).to.be.undefined
    expect(await yuhaoV4.getName()).to.equal("Name: ")

    const boxname="my Box V4"
    await yuhaoV4.setName(boxname)
    expect(await yuhaoV4.getName()).to.equal("Name: "+boxname)
  })

})