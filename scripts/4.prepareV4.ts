import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";


//获取代理地址
const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original Yuhao (proxy) address");

  const YuhaoV4 = await ethers.getContractFactory("YuhaoV4");

  //调用proxyAdmin 来升级v4
  console.log("Preparing upgrade to YuhaoV4...");
  const yuhaoV4Address = await upgrades.prepareUpgrade(proxyAddress, YuhaoV4);

  const admin = await upgrades.erc1967.getAdminAddress(proxyAddress);

  console.log(yuhaoV4Address, " V4 implementation contract address");

  addressList['proxyV4'] = proxyAddress;
  addressList['adminV4'] = admin;
  addressList['implementationV4'] = yuhaoV4Address;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})