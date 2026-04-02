// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AssemblyDemo {
    uint256 public storedValue;

    function getCallerSolidity() external view returns (address) {
        return msg.sender;
    }

    function getCallerAssembly() external view returns (address callerAddress) {
        assembly {
            callerAddress := caller()
        }
    }

    function isPowerOfTwoSolidity(uint256 x) external pure returns (bool) {
        if (x == 0) return false;
        return (x & (x - 1)) == 0;
    }

    function isPowerOfTwoAssembly(uint256 x) external pure returns (bool result) {
        assembly {
            switch x
            case 0 {
                result := 0
            }
            default {
                result := iszero(and(x, sub(x, 1)))
            }
        }
    }

    function setStoredValueSolidity(uint256 newValue) external {
        storedValue = newValue;
    }

    function setStoredValueAssembly(uint256 newValue) external {
        assembly {
            sstore(storedValue.slot, newValue)
        }
    }

    function getStoredValueAssembly() external view returns (uint256 value) {
        assembly {
            value := sload(storedValue.slot)
        }
    }
}