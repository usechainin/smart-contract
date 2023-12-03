async function main() {
  const Name = "Verifier";
  const Symbol = "VFT";

  const pomVerifierFactory = await ethers.getContractFactory(
    "ProofOfMembershipVerifier"
  );
  const pomVerifier = await pomVerifierFactory.deploy(Name, Symbol);

  await pomVerifier.deployed();
  console.log("Verifier contract address:", pomVerifier.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
