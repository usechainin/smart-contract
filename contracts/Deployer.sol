// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./OrganisationCore.sol";

contract Deployer {
    address public sourceChainMinter;
    address public deployer;
    address public proofOfMembershipVerifier;
    address public destinationMinter;

    event newSchool(
        address indexed school,
        string indexed name,
        string indexed imageURL,
        string description
    );
    event newCompany(
        address indexed company,
        string indexed name,
        string indexed imageURL,
        string description
    );

    constructor(
        address sourceChainMinter_,
        address proofOfMembershipVerifier_,
        address destinationMinter_
    ) {
        deployer = msg.sender;
        sourceChainMinter = sourceChainMinter_;
        proofOfMembershipVerifier = proofOfMembershipVerifier_;
        destinationMinter = destinationMinter_;
    }

    // @param: _name: name of company's token
    // @param: _symbol: name of company's token symbol
    // @param: operator: an array of permissioned address
    // @return: address of new deployed company contract
    function deployOrganisation(
        uint256 organisationType,
        string memory name,
        string memory symbol,
        address operator,
        string memory imageURL_,
        string memory description_
    ) public returns (address) {
        OrganisationCore newAccount = new OrganisationCore(
            organisationType,
            name,
            symbol,
            operator,
            imageURL_,
            description_,
            sourceChainMinter,
            destinationMinter,
            proofOfMembershipVerifier
        );
        if (organisationType == 1) {
            emit newCompany(address(newAccount), name, imageURL_, description_);
        } else if (organisationType == 2) {
            emit newSchool(address(newAccount), name, imageURL_, description_);
        }

        return address(newAccount);
    }
}
