import { task } from "hardhat/config";
// import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("yuhaov1", "exchagne with yuhao v1").setAction(async (_, hre) => {
  
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const yuhao = await hre.ethers.getContractAt("Yuhao", proxyAddress);

  //查看当前的value 值
  console.log("当前值: ", await yuhao.retrieve());

  //设置一个新的value值
  console.log("设置值为95: ", await yuhao.setValue(95));

  console.log("当前值: ", await yuhao.retrieve());
});

task("yuhaov2", "exchagne with yuhao v2").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const yuhaoV2 = await hre.ethers.getContractAt("YuhaoV2", proxyAddress);

  //v2 中新增了2个函数  increment / reduce
  //查看当前的value 值
  console.log("当前值: ", await yuhaoV2.retrieve());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await yuhaoV2.reduce());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await yuhaoV2.reduce());

  //调用increment 对value+1
  console.log("执行减1操作: ", await yuhaoV2.increment());
});

task("yuhaov3", "exchagne with yuhao v3").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const yuhaoV3 = await hre.ethers.getContractAt("YuhaoV3", proxyAddress);

  //v2 中新增了1个name变量  setName() 可以修改name的值
  //查看当前的value 值
  console.log("当前值: ", await yuhaoV3.retrieve());

  //查看当前name 值
  console.log("当前name值: ", await yuhaoV3.name());

  //设置name 的值
  let boxname="my Yuhao V3";
  await yuhaoV3.setName(boxname);
  
  console.log("当前name值: ", await yuhaoV3.name());
});