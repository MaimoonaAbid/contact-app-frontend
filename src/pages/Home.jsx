import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import DataForm from "../Components/Form/form";
import UserCard from "../Components/Card/card";
import { useDispatch } from "react-redux";

const Home = ({
  toggle,
  setToggle,
  userToEdit,
  setUserToEdit,
  user,
  setUser,
  reload,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("run");
    fetchData();
  }, [toggle, reload]);

  function fetchData() {
    console.log("run");
    fetch("http://localhost:8001/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        if (jsonData.length > 0) {
          dispatch({ type: "setAllUsers", payload: jsonData });
        }
      })
      .catch((err) => console.log(err));
  }

  const handleCreateUser = (user) => {
    console.log("user ", user);
    fetch(`http://localhost:8001/users/create`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("run");
    const newData = { ...user };

    if (userToEdit) {
      fetch(`http://localhost:8001/users/` + userToEdit._id, {
        method: "PUT",
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((data) => {
          // dispatch({ type: "editUser", payload: data });
          fetchData();
        });
    } else {
      handleCreateUser(newData);
      setUser({});
    }
  };

  const updateUserData = (key, value) => {
    // dynamically  set user data based on key ie. username, gender
    setUser({
      ...user,
      [key]: value,
    });
  };
  return (
    <div className="row" style={{ paddingLeft: "10px", marginTop: "30px" }}>
      <Row>
        <Col md={{ size: 5 }}>
          <DataForm
            user={user}
            updateUserData={updateUserData}
            handleSubmit={handleSubmit}
            userToEdit={userToEdit}
          />
        </Col>
        <Col md={{ size: 7 }}>
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
  );
};

export default Home;
