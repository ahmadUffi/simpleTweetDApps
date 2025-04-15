import React, { useState } from "react";
import Web3 from "web3";
import abiContract from "../contracts/main.json";
import abiProfile from "../contracts/user.json";

// profile = 0x0770B2DFb546AEB2A2b2Aff37B2D3e069cdf53f5
// tw

const Connenct = ({
  setContract,
  setUserContract,
  setAccount,
  setWeb3,
  account,
  checkProfile,
  profileExists,
}) => {
  const [loading, setLoading] = useState(false);
  async function switchToSepolia() {
    try {
      // Request user to switch to Sepolia
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Chain ID for Sepolia in hexadecimal
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          // If Sepolia is not added to user's MetaMask, add it
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Sepolia network to MetaMask", addError);
        }
      } else {
        console.error("Failed to switch to Sepolia network", switchError);
      }
    }
  }
  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const networkId = await window.ethereum.request({
          method: "net_version",
        });

        if (networkId !== "100") {
          // Network ID for Sepolia
          await switchToSepolia();
        }

        // initialize Web3 with the provider from MetaMask
        const web3 = new Web3(window.ethereum);
        await setWeb3(web3);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setLoading(true);
        setAccount(accounts[0]);

        // set ABI for maincontract
        const contractAddress = "0x1040164dDdD2F18f17286aCE523e7ae9a2307C50";
        const contract = new web3.eth.Contract(abiContract, contractAddress);
        await setContract(contract);

        // set AI for profile
        const contractAddressProfile =
          "0x0770B2DFb546AEB2A2b2Aff37B2D3e069cdf53f5";
        const contractProfile = new web3.eth.Contract(
          abiProfile,
          contractAddressProfile
        );
        await setUserContract(contractProfile);
        checkProfile(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }
  return (
    <>
      <div className="connect">
        {!account ? (
          <button id="connectWalletBtn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div id="userAddress">Connected: {account}</div>
        )}
      </div>
      <div id="connectMessage">
        {!account ? "Please connect your wallet to tweet." : ""}
      </div>
      {!profileExists ? (
        <h1>Profile does not exist</h1>
      ) : (
        <h1>{profileExists}</h1>
      )}
    </>
  );
};

export default Connenct;
