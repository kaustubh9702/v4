pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "hardhat/console.sol";

contract PayToken is ERC20 {
    constructor() ERC20("Token", "NEU"){
    }
    function mint(uint256 value) public {
        console.log(value);
        _mint(msg.sender, value);
    }
}