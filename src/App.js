import React from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./Components/Navbar/navbar.js";
import UserLogin from "./Components/Login/login.js";
import DisplayUser from "./Components/DisplayUser/display.js";
import Home from "./pages/Home";

function App() {
  // const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [reload, setReload] = useState(false);

  const [userToEdit, setUserToEdit] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userToEdit) {
      // directly spread all values from userToEdit to user state
      setUser({
        ...userToEdit,
      });
    }
  }, [userToEdit]);

  return (
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route
          exact
          path="/"
          element={<UserLogin reload={reload} setReload={setReload} />}
        />
        <Route
          path="/contacts"
          element={
            <Home
              toggle={toggle}
              setToggle={setToggle}
              userToEdit={userToEdit}
              setUserToEdit={setUserToEdit}
              user={user}
              setUser={setUser}
              reload={reload}
            />
          }
        />
        <Route
          path="/displayUserData"
          element={
            <div className="container">
              <div className="row">
                <DisplayUser />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
