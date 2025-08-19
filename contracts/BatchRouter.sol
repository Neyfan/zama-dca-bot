// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract BatchRouter {
    address public admin;
    IERC20 public USDC;

    event BatchExecuted(uint256 batchId, uint256 totalUsdc, uint256 ethReceived);
    event Distributed(uint256 batchId, address recipient, uint256 amount);

    constructor(address _usdc) {
        admin = msg.sender;
        USDC = IERC20(_usdc);
    }

    function acceptAndDistribute(
        uint256 batchId,
        address[] calldata recipients,
        uint256[] calldata usdcShares
    ) external {
        require(recipients.length == usdcShares.length, "len");

        uint256 total = 0;
        for (uint i = 0; i < usdcShares.length; i++) {
            total += usdcShares[i];
        }

        require(USDC.transferFrom(msg.sender, address(this), total), "transfer failed");

        for (uint i = 0; i < recipients.length; i++) {
            require(USDC.transfer(recipients[i], usdcShares[i]), "dist failed");
            emit Distributed(batchId, recipients[i], usdcShares[i]);
        }

        emit BatchExecuted(batchId, total, 0);
    }
}
