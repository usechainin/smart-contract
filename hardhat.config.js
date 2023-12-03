require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
      },
      {
        version: "0.8.21",
      },
    ],
  },
  networks: {
    mumbai: {
      chainId: 80001,
      url: `${process.env.ALCHEMY_MUMBAI_URL}`,
      accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
    },
    sepolia: {
      chainId: 11155111,
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
    },
  },
};
