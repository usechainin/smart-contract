async function main() {
  const DeployerContract = "Deployer";
  const sourceMinter = "0x06C33b0119642824Ba2D6a02fdDBa8FA6318fF32";
  const verifier = "0x1b9CaFa940303CA46408a9b9b924F67F8DB84213";

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
