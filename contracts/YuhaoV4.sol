// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./YuhaoV2.sol";

contract YuhaoV4 is YuhaoV2{
    string private name;

    event NameChanged(string name);
    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }

   function getName() public view returns(string memory){
      return string(abi.encodePacked("Name: ",name));
    }
}