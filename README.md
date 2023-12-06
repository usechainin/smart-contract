# smart-contract

## Polygon ID

On-chain verification is used for verifying Proof of Membership in School and Company.

## Subgraph

Query JobListingNFT contract
Endpoint: https://api.studio.thegraph.com/query/60400/chainlinkhackathon/v0.0.1

## Chainlink CCIP

Cross Chain minting NFT for job applicant.

## Workflow

1. Create a new organisation:

   - Call Deployer.deployOrganisation(): [Example](0xcdd352232348eebaa6314f313616c495740d09cafe6cde4e8a523de5536a71b3)
   - Fetch the address from first log, second topic: it will be 0x0000000000000000000000003090efe03abe6b1c0950e8e85f70c8f8f0a49372 in this [transaction log](https://mumbai.polygonscan.com/tx/0xcdd352232348eebaa6314f313616c495740d09cafe6cde4e8a523de5536a71b3#eventlog)

2. Apply for a job:

- Call OrganisationCore contract with the address of the company (fetched from previous step)
- Call ApplyJob() and select the destinationChain you want the NFT to get minted for you as a proof of applicant.
- [Example](https://mumbai.polygonscan.com/tx/0x65624c6bc665cd9d55b6a6abeba1601a9bb79215c8a95bf51f44410d4cae2ef4)
- [More detail in CCIP explorer](https://ccip.chain.link/msg/0xe36783cf46ae32dfc6135207597ac480fa9d41a6a31cd01f7ef67bc640d8e534)
- Average bridging time takes about 20 mins
