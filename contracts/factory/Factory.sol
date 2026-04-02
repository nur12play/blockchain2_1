// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ChildContract.sol";

contract Factory {
    address[] public deployedContracts;
    mapping(address => bool) public isDeployedByFactory;

    event ChildCreated(address indexed childAddress, address indexed owner, string name);
    event ChildCreated2(address indexed childAddress, address indexed owner, string name, bytes32 salt);

    function createChild(string calldata _name) external payable returns (address child) {
        ChildContract newChild = new ChildContract{value: msg.value}(msg.sender, _name);
        child = address(newChild);

        deployedContracts.push(child);
        isDeployedByFactory[child] = true;

        emit ChildCreated(child, msg.sender, _name);
    }

    function createChild2(string calldata _name, bytes32 salt) external payable returns (address child) {
        ChildContract newChild = new ChildContract{salt: salt, value: msg.value}(msg.sender, _name);
        child = address(newChild);

        deployedContracts.push(child);
        isDeployedByFactory[child] = true;

        emit ChildCreated2(child, msg.sender, _name, salt);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }

    function getCount() external view returns (uint256) {
        return deployedContracts.length;
    }

    function predictCreate2Address(
        address _owner,
        string calldata _name,
        bytes32 salt
    ) external view returns (address predicted) {
        bytes memory bytecode = abi.encodePacked(
            type(ChildContract).creationCode,
            abi.encode(_owner, _name)
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );

        predicted = address(uint160(uint256(hash)));
    }
}