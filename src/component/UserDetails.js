
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const UserDetailsPage = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const user = location.state;

  const [postList, setPostList] = useState([]);
  const [selectpostData, setSelectPostData] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectcountry, setSelectCountry] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [countryTime,setCountryTime]=useState(null)
  



useEffect(()=>{
  getCountryTime()
},[selectcountry])


  useEffect(() => {
    let timerId;

    if (!isPaused) {
      timerId = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }
   

    return () => {
      clearInterval(timerId);
    };
  }, [isPaused]);

  const formattedTime = new Date(currentTime - pausedTime).toISOString().substr(11, 8);


  const handlePauseClick = () => {
    if (isPaused) {
     
      setPausedTime(pausedTime + Date.now() - currentTime);
    } else {
     
      setCurrentTime(Date.now());
    }
    setIsPaused(!isPaused);
  };

  function getCountryTime(){
    if(country && selectcountry){
    
      let countryName=country.find((ele)=> ele === selectcountry)
      let countryNameSplit=countryName.split('/')
      let countryFirst=countryNameSplit[0];
      let city=countryNameSplit[1];

      fetch(`http://worldtimeapi.org/api/timezone/${countryFirst}/${city}`)
      .then((response) => response.json())
      .then((result) =>{
        let time= result
        setCountryTime(time)
      });
    }
  }


  function showCountryTime(){
    if(countryTime){
      let time=countryTime.datetime
      const datetime = new Date(time);
      const timeOnly = datetime.toLocaleTimeString();
      return(
        <div className="col-sm-3">
        <span style={{fontFamily: 'Orbitron, sans-serif',background:'black', color:'white',padding:'10%'}}>{timeOnly}{}</span>
        </div>
      )

    }
   
  }

  
  async function getPostList() {
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();

      // Set the fetched data in the state
      setPostList(result);
      getPostDetail();
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
 

  function getCountryDropdown() {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((result) => setCountry(result));
  }

  function getPostDetail() {
    if (postList.length > 0 && user) {
      const postData = postList.filter((ele) => ele.userId === user.id);
      setSelectPostData(postData);
    }
  }


  useEffect(() => {
    getPostList();
    getCountryDropdown();
  }, []);


  useEffect(() => {
    getPostDetail();
  }, [postList, user]);




  const handleItemClick = (country) => {
    setSelectCountry(country);
    getCountryTime()
  };

  function renderCountry() {
    return (
      <div className="row">
        <div className="col-sm-3">
          <Button variant="info" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <div className="col-sm-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectcountry && selectcountry?selectcountry:"Country DropDown" }
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {country.map((country, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleItemClick(country)}
                >
                  {country}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-sm-3">
        <span style={{fontFamily: 'Orbitron, sans-serif',background:'black', color:'white',padding:'10%'}}>{formattedTime}{}</span>
        </div>
        <div className="col-sm-3">
        <Button variant="primary" onClick={handlePauseClick} style={{marginLeft:"1cm"}}>
        {isPaused ? 'Start' : 'Pause'}
      </Button>
      </div>
      </div>
    );
  }

  function renderuserDetails() {
    return (
      <div className="container" style={{marginTop:"2cm"}}>
        <span className="title" style={{textAlign:'center'}}>
          <h3>Profile Page</h3>
          {/* {showCountryTime()} */}
        </span>
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col">Name: {user.name}</div>
              <div className="col">
                Adress:{user.address.city},{user.address.street},
                {user.address.zipcode}
              </div>
            </div>
            <div className="row">
              <div className="col">
                UseName: {user.name} | catchPhrase: {user.company.catchPhrase}
              </div>
              <div className="col">Email | Phone:{user.phone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPostDetail() {
    return (
      <div className="row" style={{ justifyContent: "left" }}>
        <h2>User Posts</h2>
        {selectpostData &&
          selectpostData.map((ele, id) => {
            return (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title" key={id}> {ele.title} </h5>
                    <p className="card-text"> {ele.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <Fragment>
      {renderCountry()}
      {renderuserDetails()}
      {renderPostDetail()}
    </Fragment>
  );
};

export default UserDetailsPage;
