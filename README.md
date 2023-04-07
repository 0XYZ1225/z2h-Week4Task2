# z2h-Week4Task2
Zero2Hero第二次作业
# 代码说明

**逻辑合约 Yuhao.sol**

获得node
```shell
npx hardhat node
```



第一个版本部署与交互
```shell
npx hardhat run scripts/1.deploy_yuhao.ts --network localhost
```
```shell
npx hardhat yuhaov1 --network localhost
```
第一次升级部署与交互
```shell
npx hardhat run scripts/2.deploy_yuhaoV2.ts --network localhost
```
```shell
npx hardhat yuhaov2 --network localhost
```
第二次升级部署与交互
```shell
npx hardhat run scripts/3.deploy_yuhaoV3.ts --network localhost
```
```shell
npx hardhat yuhaov3 --network localhost
```

