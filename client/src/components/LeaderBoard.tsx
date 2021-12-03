import React from "react";

export const LeaderBoard = ({ usersData }) => (
  <div>
    <div className="row" style={{ marginTop: 50 }}>
      <div className="col-lg-4 top-item second">
        <div className="cycle_icon">
          <span className="gradient-t orange">2</span>
        </div>
        <div className="top-item-info">
          <h5>{usersData[1].username}</h5>
          <h6>{usersData[1].score}</h6>
        </div>
      </div>

      <div className="col-lg-4 top-item">
        <div className="cycle_icon">
          <span className="gradient-t orange">1</span>
        </div>
        <div className="top-item-info">
          <h5>{usersData[0].username}</h5>
          <h6>{usersData[0].score}</h6>
        </div>
      </div>

      <div className="col-lg-4 top-item second">
        <div className="cycle_icon">
          <span className="gradient-t orange">3</span>
        </div>
        <div className="top-item-info">
          <h5>{usersData[2].username}</h5>
          <h6>{usersData[2].score}</h6>
        </div>
      </div>
    </div>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Current Score</th>
          </tr>
        </thead>
        <tbody>
          {usersData.slice(3, 10).map((user, index) => (
            <tr key={user.id}>
              <td>{index + 4}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
