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

export const HONEYPAUSE_ABI = [
  {
    "type": "function",
    "name": "add",
    "inputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "payoutToken",
        "type": "address",
        "internalType": "contract ERC20"
      },
      {
        "name": "payoutAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifier",
        "type": "address",
        "internalType": "contract IVerifier"
      },
      {
        "name": "pauser",
        "type": "address",
        "internalType": "contract IPauser"
      },
      {
        "name": "payer",
        "type": "address",
        "internalType": "contract IPayer"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "bountyCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cancel",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claim",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "payReceiver",
        "type": "address",
        "internalType": "address payable"
      },
      {
        "name": "exploiter",
        "type": "address",
        "internalType": "contract IExploiter"
      },
      {
        "name": "exploiterData",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "verifierData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getBounty",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "payoutToken",
        "type": "address",
        "internalType": "contract ERC20"
      },
      {
        "name": "payoutAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifier",
        "type": "address",
        "internalType": "contract IVerifier"
      },
      {
        "name": "pauser",
        "type": "address",
        "internalType": "contract IPauser"
      },
      {
        "name": "payer",
        "type": "address",
        "internalType": "contract IPayer"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isBountyClaimed",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "claimed",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "sandboxExploit",
    "inputs": [
      {
        "name": "exploiter",
        "type": "address",
        "internalType": "contract IExploiter"
      },
      {
        "name": "verifier",
        "type": "address",
        "internalType": "contract IVerifier"
      },
      {
        "name": "exploiterData",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "verifierData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "sandboxTryPayBounty",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "payReceiver",
        "type": "address",
        "internalType": "address payable"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "update",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "payoutToken",
        "type": "address",
        "internalType": "contract ERC20"
      },
      {
        "name": "payoutAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifier",
        "type": "address",
        "internalType": "contract IVerifier"
      },
      {
        "name": "pauser",
        "type": "address",
        "internalType": "contract IPauser"
      },
      {
        "name": "payer",
        "type": "address",
        "internalType": "contract IPayer"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "verifyBountyCanPay",
    "inputs": [
      {
        "name": "bountyId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "payReceiver",
        "type": "address",
        "internalType": "address payable"
      }
    ],
    "outputs": [
      {
        "name": "bountyCanPay",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    "type": "event",
    "name": "Updated",
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
      },
      {
        "name": "verifier",
        "type": "address",
        "indexed": false,
        "internalType": "contract IVerifier"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InsufficientPayoutError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidBountyConfigError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidClaimError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidExploitError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyBountyOperatorError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SandboxFailedError",
    "inputs": [
      {
        "name": "innerError",
        "type": "bytes",
        "internalType": "bytes"
      }
    ]
  },
  {
    "type": "error",
    "name": "SandboxSucceededError",
    "inputs": []
  }
];