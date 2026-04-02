// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OptimizedStore {
    address public immutable owner; // optimization 1: immutable
    uint256 public total;
    uint256 public counter;
    uint256 public immutable maxLimit; // optimization 2: immutable
    string public projectName;
    bool public active; // reordered for better packing with smaller types if extended later

    mapping(address => uint256) public balances;
    address[] public users;

    event ValueAdded(address indexed user, uint256 amount);

    constructor(string memory _projectName, uint256 _maxLimit) {
        owner = msg.sender;
        projectName = _projectName;
        maxLimit = _maxLimit;
        active = true;
    }

    function addUser(address user) external {
        users.push(user);
    }

    function addManyUsers(address[] calldata newUsers) external {
        uint256 len = newUsers.length; // optimization 3: cache length
        for (uint256 i = 0; i < len; ) {
            users.push(newUsers[i]);
            unchecked {
                ++i; // optimization 4: unchecked increment
            }
        }
    }

    function deposit(uint256 amount) external {
        require(active, "Not active"); // optimization 5: simpler boolean check
        require(amount > 0, "Amount must be > 0");

        uint256 newTotal = total + amount; // optimization 6: cache storage read
        require(newTotal <= maxLimit, "Limit exceeded");

        balances[msg.sender] += amount;
        total = newTotal;

        unchecked {
            ++counter; // optimization 7: unchecked arithmetic
        }

        emit ValueAdded(msg.sender, amount);
    }

    function sumBalances() external view returns (uint256 sum) {
        uint256 len = users.length; // optimization 8: cache array length
        for (uint256 i = 0; i < len; ) {
            sum += balances[users[i]];
            unchecked {
                ++i;
            }
        }
    }

    function deactivate() external {
        require(msg.sender == owner, "Not owner");
        active = false;
    }

    function getUsers() external view returns (address[] memory) {
        return users;
    }
}