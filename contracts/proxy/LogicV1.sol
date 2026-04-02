// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract LogicV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public counter;

    function initialize() public initializer {
    __Ownable_init(msg.sender);
    counter = 0;
    }
    function increment() public {
        counter += 1;
    }

    function get() public view returns (uint256) {
        return counter;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}