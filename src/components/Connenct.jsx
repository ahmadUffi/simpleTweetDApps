import React, { useState } from "react";
import Web3 from "web3";
import abiContract from "../contracts/main.json";
import abiProfile from "../contracts/user.json";

// profile = 0x0770B2DFb546AEB2A2b2Aff37B2D3e069cdf53f5
// tw

const Connenct = ({
  setContract,
  setProfileContract,
  setAccount,
  setWeb3,
  account,
  profileExists,
}) => {
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (window.ethereum) {
      try {
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
        await setProfileContract(contractProfile);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }
  function shortAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const shorAddress = shortAddress(account);
  return (
    <>
      <div className="connect">
        {!account ? (
          <button id="connectWalletBtn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div id="userAddress">Connected: {shorAddress}</div>
        )}
      </div>
      <div id="connectMessage">
        {!account ? "Please connect your wallet to tweet." : ""}
      </div>
      {!profileExists ? (
        <h1>Connect your Wallet and Make A profile</h1>
      ) : (
        <>
          <h1>{profileExists}</h1>
          <p style={{ textAlign: "center" }}>{profileExists.bio}</p>
        </>
      )}
    </>
  );
};

export default Connenct;
