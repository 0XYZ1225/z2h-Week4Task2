
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("Yuhao (proxy)", function () {
  let yuhao:Contract

  beforeEach(async function () {
    const Yuhao = await ethers.getContractFactory("Yuhao")
        //initilize with 42
        yuhao = await upgrades.deployProxy(Yuhao, [42], {initializer: 'initialize'})
    })

  it("should retrieve value previously stored", async function () {    
    console.log(yuhao.address," yuhao(proxy)") 

    expect(await yuhao.retrieve()).to.equal(BigNumber.from('42'))

    await yuhao.setValue(100)
    expect(await yuhao.retrieve()).to.equal(BigNumber.from('100'))
  })

})