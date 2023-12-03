const { Web3 } = require("web3");

const abi = require("../artifacts/contracts/OrganisationCore.sol/OrganisationCore.json");
require("dotenv").config();
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_URL}`
  );
  const CompanyAddr = "0xD472f9481Ba64Ba058bB56fa01bDE12b85239986"; // Organisation contract address fetched from createNewOrganisation.js
  const signer = new ethers.Wallet(
    `0x${process.env.MUMBAI_PRIVATE_KEY}`,
    provider
  );
  console.log(`${process.env.ALCHEMY_MUMBAI_URL}`);
  console.log(`${process.env.MUMBAI_PRIVATE_KEY}`);

  // Parameter for applyJob
  const destinationChainSelector = ethers.BigNumber.from(
    "16015286601757825753"
  );
  const listingID = 101;
  const profileURL = "https://www.linkedin.com/company/chainlink-labs/";
  const email = "chainlink@gmail.com";
  const resumeURL = "https://resume.io/resume-templates";

  // call deployOrganisation() on Deployer contract
  const CompanyFactory = new ethers.Contract(CompanyAddr, abi.abi, signer);
  const tx = await CompanyFactory.applyJob(
    destinationChainSelector, //destination selector for Sepolia
    true, // pay tx with LINK token (set to true because the sourceChainMinter already has LINK token funded)
    listingID, // listingID
    profileURL, // profileURL
    email, // email
    resumeURL //resumeURL
  );
  //   // get receipt of the transaction and fetch the event
  //   const receipt = await tx.wait();
  //   console.log(receipt);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
