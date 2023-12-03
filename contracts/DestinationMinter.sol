// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "./JobListingNFT.sol";

contract DestinationMinter is CCIPReceiver {
    JobListingNFT nft;
    address owner;

    event MintCallSuccessfull();

    constructor(address router) CCIPReceiver(router) {
        owner = msg.sender;
    }

    function setupNFT(address nftAddress) external {
        require(msg.sender == owner, "Only owner");
        nft = JobListingNFT(nftAddress);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(nft).call(message.data);
        require(success);
        emit MintCallSuccessfull();
    }
}
