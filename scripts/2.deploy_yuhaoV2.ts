
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original yuhao(proxy) address");
  const YuhaoV2 = await ethers.getContractFactory("YuhaoV2");
  console.log("upgrade to YuhaoV2...");
  const yuhaoV2 = await upgrades.upgradeProxy(proxyAddress, YuhaoV2);

  const implementation = await upgrades.erc1967.getImplementationAddress(yuhaoV2.address);

  const admin = await upgrades.erc1967.getAdminAddress(yuhaoV2.address);

  console.log(yuhaoV2.address," yuhaoV2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV2'] = yuhaoV2.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


