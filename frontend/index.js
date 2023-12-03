import React from "react";
import { render } from "react-dom";
import { QRCode } from "react-qr-svg";

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#7B3FE4",
  },
};

// update with your contract address
const deployedContractAddress = "0x1b9CaFa940303CA46408a9b9b924F67F8DB84213";

// more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
// qrValueProofRequestExample: https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/qrValueProofRequestExample.json
const qrProofRequestJson = {
  id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  body: {
    reason: "airdrop participation",
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai",
    },
    scope: [
      {
        id: 1,
        circuitId: "credentialAtomicQuerySigV2OnChain",
        query: {
          allowedIssuers: ["*"],
          context: "ipfs://QmfUycCFuSkdeUMdgYPTPH29KMhw6u7jFThoa93YbHacko",
          credentialSubject: {
            isMember: {
              $eq: 1,
            },
          },
          type: "Membership",
        },
      },
    ],
  },
};

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.root}>
        <h2 style={styles.title}>Claim Membership NFT on Polygon Mumbai</h2>

        <div>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </div>
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
