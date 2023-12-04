async function main() {
  const DeployerContract = "Deployer";
  const sourceMinter = "0xbA5B3f0643582E75AF252e7631dE62c046970167";
  const verifier = "0x171C1161bCde7adB32a9Ca92c412d39bE6F97C59";

  const DeployerContractFactory = await ethers.getContractFactory(
    DeployerContract
  );
  const deployerContract = await DeployerContractFactory.deploy(
    sourceMinter,
    verifier
  );

  await deployerContract.deployed();
  console.log("Deployer contract address:", deployerContract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
