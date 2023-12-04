// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./SourceChainMinter.sol";
import "./ProofOfMembershipVerifier.sol";

// Organisation Account logic

// Polygon ID: proof of membership of the organisation
// Chainlink CCIP: for cross-chain minting nft as a proof of applying job of the company

contract OrganisationCore is ERC721 {
    uint64 public constant TRANSFER_REQUEST_ID = 1; //polygonID's ZKPVerifier.sol proofs mapping parameter

    address private operator; // Operator of organisation
    address[] private members;
    uint256 private memberIndex; // increment index when new member is added
    uint256 public OrganisationType; // 1 = company, 2 = school
    string public imageURL;
    string public description;

    SourceChainMinter sourceChainMinter; // source chain minter that call ccip.send
    ProofOfMembershipVerifier pomVerifier; // contract to verify proof of membership

    mapping(address => uint256) memberToIndex;
    mapping(uint256 => address) indexToMember;

    event OperatorSwitched(
        address indexed operator,
        address indexed oldOperator
    );
    event NewMemberAdded(address indexed member, uint256 indexed id);
    event MemberRemoved(address member);

    modifier onlyOperator() {
        require(operator == msg.sender, "onlyOwner!");
        _;
    }

    constructor(
        uint256 organisationType,
        string memory name_,
        string memory symbol_,
        address operator_,
        string memory imageURL_,
        string memory description_,
        address sourceChainMinter_,
        address pomVerifier_
    ) ERC721(name_, symbol_) {
        OrganisationType = organisationType;
        operator = operator_;
        imageURL = imageURL_;
        description = description_;
        sourceChainMinter = SourceChainMinter(payable(sourceChainMinter_));
        pomVerifier = ProofOfMembershipVerifier(pomVerifier_);
    }

    //====================================Job Listing Logics==========================================
    // Anyone can call applyJob() when they see the job listed by company
    // this will call sourceChainMinter.mint() to mint NFT on destination chain for user as a proof of applicant
    function applyJob(
        uint64 destinationChainSelector,
        bool isPayLink,
        uint256 listingID,
        string memory profileURL
    ) external {
        sourceChainMinter.mint(
            destinationChainSelector,
            msg.sender,
            isPayLink, // pay with LINK token in SourceChainMinter.sol
            listingID,
            profileURL
        );
    }

    //====================================Operator Logics==================================
    function switchOperator(address newOperator) public onlyOperator {
        emit OperatorSwitched(newOperator, operator);
        operator = newOperator;
    }

    //=================================Member Logics=======================================
    // Add new member into member list, mint one token for them, can only be done by operator.
    // Alternatively, member can mint the NFT themselves by proving that they've been verified by PolygonID and call claimMembership()
    function addNewMember(address newMember) public onlyOperator {
        members.push(payable(newMember));

        _mint(newMember, memberIndex);
        memberToIndex[newMember] = memberIndex;
        indexToMember[memberIndex] = newMember;

        emit NewMemberAdded(newMember, memberIndex);
        memberIndex++;
    }

    // remove employee from the list
    function removeMember(address _addressToRemove) public onlyOperator {
        //very costly process
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _addressToRemove) {
                // Shift the elements to fill the gap
                for (uint256 j = i; j < members.length - 1; j++) {
                    members[j] = members[j + 1];
                }
                // Reduce the array length
                members.pop();
                emit MemberRemoved(_addressToRemove);
                break; // Exit the loop after removal
            }
        }
    }

    // for organisation member to claim the proof of membership NFT themselves
    function claimMembership() external {
        require(
            pomVerifier.getProofs(msg.sender),
            "Address is not verified by PolygonID"
        );
        _mint(msg.sender, memberIndex);
        memberToIndex[msg.sender] = memberIndex;
        indexToMember[memberIndex] = msg.sender;
        memberIndex++;
    }

    function getTotalMember() external view returns (uint256 memberCount) {
        return members.length;
    }
}
