
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

async function main() {

  const Yuhao = await ethers.getContractFactory("Yuhao")
  console.log("Deploying yuhao...")
  
  //部署合约  执行3笔交易  部署 代理合约 逻辑合约  proxyadmin合约
  const yuhao = await upgrades.deployProxy(Yuhao,[42], { initializer: 'initialize' })

  await yuhao.deployed();
  console.log(yuhao.address," yuhao(proxy) address")

  const admin = await upgrades.erc1967.getAdminAddress(yuhao.address);

  console.log(admin," AdminAddress");

  const implementation = await upgrades.erc1967.getImplementationAddress(yuhao.address);

  console.log(implementation," ImplementationAddress")

  const addressList = readAddressList();

  addressList['proxy'] = yuhao.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})