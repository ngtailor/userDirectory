import React from "react";
const UserCard = ({ user, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="container">
        <div className="row justify-content-md-center">
          <div
            className="col col-lg-2"
            style={{ width: "30rem", color: "blue"}}
          >
            <div
              className="card"
              style={{
                background: "grey",
                color: "white",
                fontFamily: "monospace",
              }}
            >
              <div class="container">
                <div class="row">
                  <div class="col-md-6">Name:{user.name}</div>
                  <div class="col-md-6">
                    <span class="pull-right">Posts:10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
