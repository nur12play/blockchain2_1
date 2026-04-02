// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./LogicV1.sol";

contract LogicV2 is LogicV1 {

    function decrement() public {
        require(counter > 0, "Counter is zero");
        counter -= 1;
    }

    function reset() public {
        counter = 0;
    }
}