# smart-contract

## Polygon ID

On-chain verification is used for verifying Proof of Membership in School and Company.

## Subgraph

Query JobListingNFT contract
Endpoint: https://api.studio.thegraph.com/query/60400/chainlinkhackathon/v0.0.1

## Chainlink CCIP

Cross Chain minting NFT for job applicant.

## ContractWorkflow

1. Create a new organisation:

   - Call Deployer.deployOrganisation():
     ```
     uint256 organisationType: 1 for company, 2 for school
     string memory name: name of organisation
     string memory symbol: symbol of organisation's token
     address operator: operator of the organisation
     string memory imageURL_: imageURL of organisation
     string memory description_: description of organisation
     ```
   - [Example](https://mumbai.polygonscan.com/tx/0xf937560503d220fc9b696c2a30b75a00b5cf8fbc781caf8a134e983c45d1d594#eventlog)
   - Fetch the address from first log, second topic (topics[1]): it will be 0x61457e7506a55ac36fb5f17600b4b1eb529cdf8a(remove redundant 0s) in this [transaction log](https://mumbai.polygonscan.com/tx/0xf937560503d220fc9b696c2a30b75a00b5cf8fbc781caf8a134e983c45d1d594#eventlog)

2. Apply for a job:

- Attach OrganisationCore contract with the address of the company (fetched from previous step)
- Call OrganisationCore.ApplyJob() and select the destinationChain you want the NFT to get minted for you as a proof of applicant.

```
uint64 destinationChainSelector: chainlink CCIP destination selector
bool isPayLink: set to true
uint256 listingID: listing ID of the job
string memory profileURL: profileURL of the candidate
```

- [Example](https://mumbai.polygonscan.com/tx/0x445a941623fdd91a2ae35f7a19da2a82a926e7e422fc3f5d93873160e8cbd1c2)
- [More detail in CCIP explorer](https://ccip.chain.link/msg/0x91113caad60eca1795f681b287fdc5dceaccde3e879cfe82128052144d2e17ac)
- Average bridging time takes about 10 mins
- JobListingNFT successfully minted [transaction](https://sepolia.etherscan.io/tx/0x200d90a896438fb0e21361edd271c2cbb34637f7fffada0ea20613e0de08f86a)

3. User want to prove one's membership in the organisation

- User has to already hold the [`Membership`](https://schema-builder.polygonid.me/schemas/f8121b7e-4221-4825-9204-b4146c51fc22) credential in their polygon ID wallet.

  - Issue credential for user by importing the [`Membership`](https://schema-builder.polygonid.me/schemas/f8121b7e-4221-4825-9204-b4146c51fc22) JSON schema URL in https://user-ui:password-ui@issuer-ui.polygonid.me/schemas

- Once the user has the credential, they can proceed to scan requestQR (example: frontend/index.js). It will create and send proof to ProofOfMembershipVerifier contract. If success, user will be minted an organisation's NFT.

## Scripts

1. `scripts/createNewOrganisation.js`: Script to create new organisation and fetch address from log event.
2. `scripts/applyNewJob.js`: script to apply new job and mint joblistingNFT cross-chain using CCIP.
3. `scripts/queryJobListingNFT.js`: script to query subgraph endpoint for `newApplicant` event from JobListingNFT contract on destination chain.

## Deployment

## Mumbai (Source)

1. SourceChainMinter: [`0x16B43E348e0A19E9196ae79D172aDC52B3Aa3E20`](https://mumbai.polygonscan.com/address/0x16b43e348e0a19e9196ae79d172adc52b3aa3e20)
2. ProofOfMembershipVerifier: [`0x171C1161bCde7adB32a9Ca92c412d39bE6F97C59`](https://mumbai.polygonscan.com/address/0x171C1161bCde7adB32a9Ca92c412d39bE6F97C59)
3. Deployer: [`0xBcDd7fcD1fFa1AFC4783dbf345E541BC46dEE3C8`](https://mumbai.polygonscan.com/address/0xBcDd7fcD1fFa1AFC4783dbf345E541BC46dEE3C8)

## Sepolia (Destination)

1. DestinationMinter: `0x3a3C3F10db0B5DF58C29Cc4C6E008A692e321b50`
2. JobListingNFT.sol: `0x6aF3907Fcbe8eC279878BAFc5861D756B36f9710`

## Avalanche Fuji (Destination)

1. DestinationMinter: `0xcF7E187Ed1090B9CE8E4a7266B5309d839E85648`
2. JobListingNFT.sol: `0x6be796cb66CdB3566b8AbebA2C516CbDF93fE831`
   Sample cross chain NFT minted: https://ccip.chain.link/msg/0x93cf3863777ab57c532ca201b4e44ee363d1b7413bd30af4065884ccae5b054f

## Optimism Goerli (Destination)

1. DestinationMinter: `0x1ff52708d610b1d17f0830f036e992677cdc508a`
2. JobListingNFT.sol: `0x03399fac4e4ef2f17e8f464808dd30a1eaaa8997`
   Sample cross chain NFT minted: https://ccip.chain.link/msg/0x35f0b23a97910a7702936be3b2f26d44950bb3a9dfad6534c0bdeb6f1a689a44
