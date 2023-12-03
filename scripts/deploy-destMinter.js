async function main() {
  const router = "0xd0daae2231e9cb96b94c8512223533293c3693bf";

  const destMinterFactory = await ethers.getContractFactory(
    "DestinationMinter"
  );
  const destMinter = await destMinterFactory.deploy(router);

  await destMinter.deployed();
  console.log("destMinter contract address:", destMinter.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
