const abi = require("../artifacts/contracts/Deployer.sol/Deployer.json");
require("dotenv").config();
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_URL}`
  );
  const deployerAddr = "0x0854d10eF62823731C0227670915C9F569f8f47f"; // deployer contract on mumbai
  const signer = new ethers.Wallet(
    `0x${process.env.MUMBAI_PRIVATE_KEY}`,
    provider
  );

  // Parameter for organisation
  const organisationType = 1; //1 = company, 2 = school
  const name = "Google";
  const symbol = "GOG";
  const operator = await signer.getAddress();
  const imageURL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png";
  const description =
    "Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.";

  // call deployOrganisation() on Deployer contract
  const DeployerFactory = new ethers.Contract(deployerAddr, abi.abi, signer);
  const tx = await DeployerFactory.deployOrganisation(
    organisationType,
    name,
    symbol,
    operator,
    imageURL,
    description
  );
  // get receipt of the transaction and fetch the event
  const receipt = await tx.wait();

  // fetch address of school/ company
  const newCompanySignature =
    "0xe975ce806e0fc48202608973e25a92eea9300b592f652043a604115a3af3171c";
  const newSchoolSignature =
    "0x0e28d88ea1f6786fc9c3fd67495a54fa0b5314e896d79d823be19bc399e78ce6";
  let schoolABI = [
    "event newSchool(address indexed school,string indexed name,string indexed imageURL,string description)",
  ];
  let companyABI = [
    "event newCompany(address indexed company,string indexed name,string indexed imageURL,string description)",
  ];
  //https://docs.ethers.org/v5/api/utils/abi/interface/
  let schoolIFace = new ethers.utils.Interface(schoolABI);
  let companyIFace = new ethers.utils.Interface(companyABI);
  receipt.logs.forEach((log) => {
    if (log.topics[0] == newSchoolSignature) {
      const parsedLog = schoolIFace.parseLog(log);
      const schoolAddr = parsedLog.args[0]; // address need to be stored
      const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
      const hash_imageURL = parseLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
      const description = parsedLog.args[3]; // original string

      // store the schoolAddr in DB
      // TODO: Define your logic here
      console.log("New school deployed on ", schoolAddr);
    } else if (log.topics[0] == newCompanySignature) {
      const parsedLog = companyIFace.parseLog(log);
      const companyAddr = parsedLog.args[0]; // address need to be stored
      const hashed_name = parsedLog.args[1].hash; // indexed string parameter is the keccak256(name)
      const hash_imageURL = parseLog.args[2].hash; // indexed string parameter is the keccak256(imageURL)
      const description = parsedLog.args[3]; // original string
      console.log("New company deployed on ", companyAddr);

      // store the companyAddr in DB
      // TODO: Define your logic here
    } else {
      console.log("No new organisation deployed in logIndex: ", log.logIndex);
    }
  });
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Sample output from parseLog
//   LogDescription {
//     eventFragment: {
//       name: 'newCompany',
//       anonymous: false,
//       inputs: [ [ParamType], [ParamType], [ParamType], [ParamType] ],
//       type: 'event',
//       _isFragment: true,
//       constructor: [Function: EventFragment] {
//         from: [Function (anonymous)],
//         fromObject: [Function (anonymous)],
//         fromString: [Function (anonymous)],
//         isEventFragment: [Function (anonymous)]
//       },
//       format: [Function (anonymous)]
//     },
//     name: 'newCompany',
//     signature: 'newCompany(address,string,string,string)',
//     topic: '0xe975ce806e0fc48202608973e25a92eea9300b592f652043a604115a3af3171c',
//     args: [
//       '0xD472f9481Ba64Ba058bB56fa01bDE12b85239986',
//       {
//         _isIndexed: true,
//         hash: '0xf610f88085f5955bccb50431e1315a28335522d87be5000ff334274cc9985741',
//         constructor: [Function]
//       },
//       {
//         _isIndexed: true,
//         hash: '0x5c7d4efb2eaa9389846cd336ec0a70cad145a3f15bf918cd88cbbcf2bd9befee',
//         constructor: [Function]
//       },
//       'Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.'
//     ]
//   }
