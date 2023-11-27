import React from "react";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
const CardList = (props) => {
  const [userList, setUserList] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getUserList();
  }, []);

  function getUserList() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => setUserList(result));
  }

  function getTotalPost() {
    let post = userList.map((item, id) => post);
  }

  const handleUserClick = (user) => {
    history("/details", { state: user });
  };

  return (
    <div>
     <div className="mx-auto" style={{width:'200px', alignItems:'center',fontSize:'30px', marginTop:'2cm'}}>
  Directory
</div>
      {userList.map((item, id) => {
        return (
          <UserCard
            key={item.id}
            user={item}
            onClick={() => handleUserClick(item)}
          />
        );
      })}
    </div>
  );
};
export default CardList;
