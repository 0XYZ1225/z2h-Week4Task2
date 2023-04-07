import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original yuhao(proxy) address");
  const YuhaoV3 = await ethers.getContractFactory("YuhaoV3");
  console.log("upgrade to YuhaoV3...");
  const yuhaoV3 = await upgrades.upgradeProxy(proxyAddress, YuhaoV3);

  const implementation = await upgrades.erc1967.getImplementationAddress(yuhaoV3.address);

  const admin = await upgrades.erc1967.getAdminAddress(yuhaoV3.address);


  console.log(yuhaoV3.address," yuhaoV2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV3'] = yuhaoV3.address;
  addressList['adminV3'] = admin;
  addressList['implementationV3'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


