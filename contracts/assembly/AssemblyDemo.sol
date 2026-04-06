// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AssemblyDemo {
    uint256 public storedValue;

    // Solidity version of msg.sender
    function getCallerSolidity() external view returns (address) {
        return msg.sender;
    }

    // Assembly version using caller()
    function getCallerAssembly() external view returns (address callerAddress) {
        assembly {
            callerAddress := caller()
        }
    }

    // Solidity power-of-two check
    function isPowerOfTwoSolidity(uint256 x) external pure returns (bool) {
        if (x == 0) return false;
        return (x & (x - 1)) == 0;
    }

    // Assembly power-of-two check
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

    // Solidity storage write
    function setStoredValueSolidity(uint256 newValue) external {
        storedValue = newValue;
    }

    // Solidity storage read
    function getStoredValueSolidity() external view returns (uint256) {
        return storedValue;
    }

    // Assembly storage write using sstore
    function setStoredValueAssembly(uint256 newValue) external {
        assembly {
            sstore(storedValue.slot, newValue)
        }
    }

    // Assembly storage read using sload
    function getStoredValueAssembly() external view returns (uint256 value) {
        assembly {
            value := sload(storedValue.slot)
        }
    }
}