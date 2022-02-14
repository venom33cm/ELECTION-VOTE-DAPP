import React, { useState } from "react";
import "./Main.css";

function Main({ datas, voting }) {
  const [voteid, setvoteid] = useState();
  const handlesubmit = (e) => {
    e.preventDefault();
    if (voteid) voting(Number(voteid));
    else window.alert("there is error");
  };
  return (
    <div className="table">
      <div className="container">
        <h4 className="id">Election Id</h4>
        <h4 className="name">Party Name</h4>
        <h4 className="votes">Vote Count</h4>
      </div>
      {datas.map((data) => (
        <div className="container" key={data.id}>
          <div className="id">{data.id}</div>
          <div className="name">{data.name}</div>
          <div className="votes">{data.noOfVotes}</div>
        </div>
      ))}
      <div className="btncontainer">
        <h4 style={{ margin: "20px" }}>vote your candidate</h4>
        <form
          style={{
            textAlign: "center",
            margin: "20px",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handlesubmit}
        >
          <select
            name=""
            id=""
            style={{
              width: "90vh",
              outline: "none",
              border: "1px solid #FF5733",
              borderRadius: "3px",
              height: "30px",
              color: "grey",
              background: "white",
              padding: "3px",
            }}
            onChange={(e) => {
              setvoteid(e.target.value);
            }}
          >
            <option value="">Select</option>
            {datas.map((data) => (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <button className="btn">
            Confirm your vote to candidate {voteid}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;
