import React from "react";
import {Row,Col} from 'reactstrap';
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from "./Components/Navbar/navbar.js"
import DataForm from "./Components/Form/form.js"
import UserCard from "./Components/Card/card.js"
import UserLogin from "./Components/Login/login.js"
import DisplayUser from "./Components/DisplayUser/display.js"
import { useDispatch } from 'react-redux';

function App() {
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [reload, setReload] = useState(false)

  const [userToEdit, setUserToEdit] = useState(null);
  const [user, setUser] = useState({});
  // const [id, setId] = useState(7)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("run")
    fetchData();
  }, [toggle]);

  function fetchData() {
    console.log("run")
    fetch('http://localhost:8001/users')
      .then(res => res.json())
      .then(jsonData => {
        console.log({jsonData})
        dispatch({ type: 'setAllUsers', payload: jsonData })
      })
  }
  const handleCreateUser = (user) => {
    console.log("user ",user)
    fetch(`http://localhost:8001/users/create`, {
      method: 'POST',
      body: JSON.stringify(user),
       headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.json())
    .then ((data) => {
      // console.log({data})
      fetchData()
      // dispatch({ type: 'setAllUsers' })
    //  dispatch({ type: 'createUsers' })
    })
    .catch((error) => console.error(error));
  };
  
  useEffect(() => {
    if (userToEdit) {
      // directly spread all values from userToEdit to user state
      setUser({
        ...userToEdit,
      });
    }
  }, [userToEdit]);

  const updateUserData = (key, value) => {
    // dynamically  set user data based on key ie. username, gender
    setUser({
      ...user,
      [key]: value,
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("run");
    // setId(prevId => prevId + 1)
    const newData = { ...user };
  
    if (userToEdit) {
      // console.log(`http://localhost:8001/users/`+ userToEdit.id)
      fetch(`http://localhost:8001/users/`+ userToEdit.id, {
        method: "PUT",
        body: JSON.stringify(newData),
      })
      // console.log("id", userToEdit.id)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "setAllUsers", payload: data });
        });
    } else {
      handleCreateUser(newData);
      setUser({});
    }
    // console.log("userToEdit:", userToEdit);
    // console.log("userData:", userData);
    // console.log("user:", user);
    // console.log("newData:", newData);
  };
       
  return (
    <BrowserRouter>
      <MyNavbar />

        <Routes>
          <Route exact path="/" element={<UserLogin reload={reload} setReload={setReload} />}/>
          <Route
            path="/contacts"
            element={
            <div className="row" style={{paddingLeft:'10px', marginTop:'30px'}}>
              <Row>
                <Col md={{size: 5}}>
                <DataForm
                  user={user}
                  updateUserData={updateUserData}
                  handleSubmit={handleSubmit}
                  userToEdit={userToEdit}
                />
                </Col>
                <Col md={{size: 7}}>
                <UserCard
                      key={user.id}
                      user={user}
                      setUserToEdit={setUserToEdit}
                      setToggle={setToggle}
                      toggle={toggle}
                    />
                </Col>
                
            </Row>                    
                  
                   
                  </div>
            }
          />
          <Route path="/displayUserData" element={<div className="container">
            <div className="row">
          
            <DisplayUser/>
            </div>
          </div>} />
        </Routes>
      
    </BrowserRouter>
  );
}
export default App;

