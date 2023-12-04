// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract JobListingNFT is ERC721 {
    uint256 applicantsCount;
    address minter;
    address link_token;
    uint256 applicantIndex;
    uint256 IndexStart = block.chainid;

    mapping(address => bool) hasApplied;

    event newApplicant(
        address indexed applicant,
        uint256 indexed listingID,
        string profileURL
    );

    constructor(address minter_) ERC721("JobListingToken", "JLT") {
        minter = minter_;
    }

    function mint(
        address receiver,
        uint256 listingID,
        string memory profileURL
    ) public {
        require(msg.sender == minter, "only Router can call mint!");
        _mint(receiver, applicantsCount);
        emit newApplicant(receiver, listingID, profileURL);

        applicantsCount++;
    }
}
