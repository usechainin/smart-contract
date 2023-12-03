async function main() {
  const router = "0x70499c328e1e2a3c41108bd3730f6670a44595d1";
  const linkAddr = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

  const SourceMinterFactory = await ethers.getContractFactory(
    "SourceChainMinter"
  );
  const sourceMinter = await SourceMinterFactory.deploy(router, linkAddr);

  await sourceMinter.deployed();
  console.log("Source Minter contract address:", sourceMinter.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
