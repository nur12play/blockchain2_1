// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UnoptimizedStore {
    uint256 public total;
    uint256 public maxLimit;
    address public owner;
    bool public active;
    uint256 public counter;
    string public projectName;

    mapping(address => uint256) public balances;
    address[] public users;

    event ValueAdded(address user, uint256 amount);

    constructor(string memory _projectName, uint256 _maxLimit) {
        owner = msg.sender;
        projectName = _projectName;
        maxLimit = _maxLimit;
        active = true;
    }

    function addUser(address user) public {
        users.push(user);
    }

    function addManyUsers(address[] memory newUsers) public {
        for (uint256 i = 0; i < newUsers.length; i++) {
            users.push(newUsers[i]);
        }
    }

    function deposit(uint256 amount) public {
        require(active == true, "Not active");
        require(amount > 0, "Amount must be > 0");
        require(total + amount <= maxLimit, "Limit exceeded");

        balances[msg.sender] = balances[msg.sender] + amount;
        total = total + amount;
        counter = counter + 1;

        emit ValueAdded(msg.sender, amount);
    }

    function sumBalances() public view returns (uint256 sum) {
        for (uint256 i = 0; i < users.length; i++) {
            sum = sum + balances[users[i]];
        }
    }

    function deactivate() public {
        require(msg.sender == owner, "Not owner");
        active = false;
    }

    function getUsers() public view returns (address[] memory) {
        return users;
    }
}
