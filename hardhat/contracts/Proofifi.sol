// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Proofifi is ERC721, ERC721URIStorage, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;
    mapping(address => bool) private allowlist;

    constructor(address initialOwner)
        ERC721("Proofifi", "PFI")
        Ownable(initialOwner)
    {
        allowlist[initialOwner] = true;
    }

    function totalSupply() public view onlyOwner returns (uint256) {
        return _nextTokenId;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    modifier onlyAllowlisted() {
        require(allowlist[msg.sender], "Sender is not allowlisted");
        _;
    }

    // Add an address to the allowlist
    function addToAllowlist(address addr) public onlyOwner {
        allowlist[addr] = true;
    }

    // Remove an address from the allowlist
    function removeFromAllowlist(address addr) public onlyOwner {
        allowlist[addr] = false;
    }

    // Check if an address is on the allowlist
    function isAllowlisted(address addr) onlyOwner public view returns (bool) {
        return allowlist[addr];
    }

    function safeMint(address to, string memory uri) public onlyAllowlisted {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
