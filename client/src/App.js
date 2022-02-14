import React, { useState, useEffect } from "react";
import "./App.css";
import Electionabi from "./contracts/Election.json";
import Web3 from "web3";
import Main from "./components/Main";
function App() {
  const loadweb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non etheereum browser detected !! use metamask in your browser"
      );
    }
  };
  let arr = [];
  const [account, setaccount] = useState("");
  const [loader, setloader] = useState(false);
  const [election, setelection] = useState();
  const [data, setdata] = useState();
  const load_datas = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setaccount(account);
    setloader(false);
    const networkId = await web3.eth.net.getId();
    const networkdata = Electionabi.networks[networkId];
    if (networkdata) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkdata.address
      );
      const n = await election.methods.noOfCandidates().call();
      console.log(n);
      let i;
      for (i = 0; i < n; i++) {
        arr[i] = await election.methods.candidates(i + 1).call();
      }
      setdata(arr);

      console.log(election);
      setelection(election);
    } else {
      window.alert("the smart contract  is not deployed");
    }
  };
  useEffect(() => {
    loadweb3();
    load_datas();
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const voting = async (candidateid) => {
    //setdata(newarr);
    await election.methods
      .voteCandidate(candidateid)
      .send({ from: account })
      .on("transactionhash", () => {
        console.log("voting done");
      });
    window.location.reload();
  };
  if (loader) {
    return <div>loading</div>;
  }
  return (
    <div>
      <div className="header">
        <h1>Election Vote Dapp</h1>
      </div>
      {account ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          Your current Account address is:{" "}
          <span>
            <h4 style={{ display: "inline" }}>{account}</h4>
          </span>
        </div>
      ) : (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h3>Connect with your Metamask Account to vote !!!</h3>
        </div>
      )}
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        Election poll results
      </h3>
      {data ? <Main datas={data} voting={voting} /> : ""}
    </div>
  );
}

export default App;
