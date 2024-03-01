export const CREATED_EVENT =   {
    "type": "event",
    "name": "Created",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "payoutToken",
        "type": "address",
        "indexed": false,
        "internalType": "contract ERC20"
      },
      {
        "name": "payoutAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "verifier",
        "type": "address",
        "indexed": false,
        "internalType": "contract IVerifier"
      }
    ],
    "anonymous": false
  };

export const CLAIMED_EVENT = {
    "type": "event",
    "name": "Claimed",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "payoutToken",
        "type": "address",
        "indexed": false,
        "internalType": "contract ERC20"
      },
      {
        "name": "payoutAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
};

export const CANCELLED_EVENT = {
    "type": "event",
    "name": "Cancelled",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
};

export const ERC20_ABI = [
  {
    type: "function",
    stateMutability: "view",
    name: "symbol",
    inputs: [],
    outputs: [
      { type: "string", name: "symbol" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "decimals",
    inputs: [],
    outputs: [
      { type: "uint256", name: "decimals" },
    ],
  },
]