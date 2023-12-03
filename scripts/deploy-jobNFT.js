async function main() {
  const minter = "0x3a3C3F10db0B5DF58C29Cc4C6E008A692e321b50";

  const JobNFTFactory = await ethers.getContractFactory("JobListingNFT");
  const JobNFT = await JobNFTFactory.deploy(minter);

  await JobNFT.deployed();
  console.log("JobNFT contract address:", JobNFT.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
