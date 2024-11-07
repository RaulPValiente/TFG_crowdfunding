// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        uint256 deadline;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    
    // Tax Wallet and tax percentage
    address public taxWallet = 0x27C70E2AC85631FEa53a1Ca28384fEb2c161b40b;
    uint256 public taxPercentage = 1;

   
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image
    ) public returns (uint256) {

        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(campaign.deadline < block.timestamp, "Invalid deadline.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Calculate tax
        uint256 taxAmount = (amount * taxPercentage) / 100;
        uint256 remainingAmount = amount - taxAmount;

        // Sent tax
        (bool taxSent, ) = payable(taxWallet).call{value: taxAmount}("");
        require(taxSent, "Failed to send tax");

        // Sent the remaining amount
        (bool sent, ) = payable(campaign.owner).call{value: remainingAmount}("");
        require(sent, "Failed to send donation");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }

    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        
        return (campaigns[_id].donators, campaigns[_id].donations);
    
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage element = campaigns[i];
            allCampaigns[i] = element;
        }

        return allCampaigns;

    }
}

// Wallet Private Key: a26f1f0234294e9f441f8c73bc4cdf1d7e5ab779c4b92d1eb8d1a075353ea4c8
// Thirdweb Client ID: 23f367c462a36456d61d8321e9c3aaec
// Thirdweb SecretKey: Y1sGqSq-f9FPiXzF5ODeLybPxr3BAnJ5m-7h1WuRCyTskZHZhGzoIjjaGqih8zBq4XkZba-Q4BZBvBowdVPxZA
