# PolygonID

## Prerequisit

1. PolygonID wallet app

## Step by Step

### Create and Issue Schema

1. Proof of Membership schema: https://schema-builder.polygonid.me/schemas/f8121b7e-4221-4825-9204-b4146c51fc22
2. Import schema in https://user-ui:password-ui@issuer-ui.polygonid.me/schemas
3. **Issue** schema
4. Open PolygonID wallet and scan the QR code.

### Create Verifier Contract

1. Create Verifier Contract in `./contracts/ProofOfMembershipVerifier.sol`.
2. set request on verifier contract to define the request the contract need to verify for, run the script in `scripts/set-request.js`, parameters in the scripts are fetched from:
   - `schemaPathKey`: Go to `https://go.dev/play/p/3id7HAhf-Wi` and select Go dev branch
   - `schemaBigInt`, `type`, `schemaURL`: from https://schema-builder.polygonid.me/schemas/f8121b7e-4221-4825-9204-b4146c51fc22

### Request for proof

1. User scan the request QR code from `./frontend/index.js` [Codesandbox example](https://codesandbox.io/s/zisu81?file=/index.js)with polygonID wallet, it will prompt to connect your wallet(i.e. Metamask).
2. Connect Wallet with PolygonID wallet
3. The polygonID will start generating proof.
4. After proof generation done, it will automatically switch to your wallet and create submit zkp request transaction.
5. Once the transaction is sent, the on-chain verification will be done and be minted an NFT if verification is passed.

## current pre-deployed contracts

**mtp verifier address** - 0xF71d97Fc0262bB2e5B20912a6861da0B617a07Aa

**sig verifier address** - 0x8024014f73BcCAEe048784d835A36c49e96F2806

**default mtp validator** - 0x0682fbaA2E4C478aD5d24d992069dba409766121

**default sig validator** - 0x1E4a22540E293C0e5E8c33DAfd6f523889cFd878

**default state address** - 0x134B1BE34911E39A8397ec6289782989729807a4
