import { useNavigate } from 'react-router-dom';
import './card.css';
import { Card, CardBody, Row, Col, FormGroup, CardGroup } from 'reactstrap';
import emailImg from './mail.png';
import phoneImg from './telephone.png'
import userImg from './girl_user.png'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios'

//className="d-none"
function UserCard({ setUserToEdit, toggle, setToggle }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  async function handleDeleteUser(id) {
    console.log({id});
    // const res = await axios.delete(`http://localhost:8001/deleteUser/${id}`)
    // console.log(res)
    // fetch(`http://localhost:8001/deleteUser/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // }).then(res =>res.json())
    // .then((data) => console.log(data))
    // .catch(err => console.log(err))
    fetch(`http://localhost:8001/deleteUser/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data delete",data)
        setToggle(!toggle)
        // dispatch({type:'deleteUser', payload:data})
      })
      .catch((error) => console.error(error));
  };

  const { userData } = useSelector((state) => ({
    userData: state.reducer1.allUsers,
  }));

  console.log({userData})

  const updatedUserData = userData?.map((user) => ({
    ...user,
    // picture: user.picture || userImg,
  }));

  //deleting 
  const dispatch = useDispatch();
  const handleButtonClick = (id) => {
    debugger;
    dispatch({ type: 'deleteUsers', payload: id });
  };
  return (


    <div>
      <Row>
        <Col md='3'>
        <FormGroup className='form' style={{ textAlign: 'left' }}>
        <label for="filter"></label>
        <input id="filter" name="filter" placeholder='Filter Contacts...' type="text" style={{  marginTop: '30px', height: '30px' }} />
      </FormGroup>
        </Col>
      </Row>
      
      <Row>
      {updatedUserData?.map((user, index) => (
        <Col md="6">
        <Card  style={{ marginBottom: '30px', backgroundColor: 'beige', border: '2px' }} key={index}>
        <CardBody>
          <Row>
            <Col xs="8" md="9" lg="9" xl="9" className="text-start" style={{ marginTop: '20px' }} id="displayName">
              <h5 className="card-title" style={{ marginLeft: '30px' }}><b>{user.username}</b></h5>
              <ul>
                <li>
                  <span ><img src={phoneImg} alt="Logo" width="20" height="20" className="d-inline-block align-text-top" style={{ marginTop: '2px' }} /></span>
                  <span id="displayPhone" className="text">{user.phone} </span>
                </li>
                <li>
                  <span> <img src={emailImg} alt="Logo" width="20" height="20" className="d-inline-block align-text-top" style={{ marginTop: '1px' }} /> </span>
                  <span id="displayemail" className="text">{user.email} </span>
                </li>
                <li style={{ marginTop: '5px' }}>

                  <button type="button" className="btn btn-dark btn-sm" onClick={() => setUserToEdit(user)}>Edit</button> {' '}
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>{' '}
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      console.log('view user details')
                      setSelectedUser(user);
                      navigate('/displayUserData', { state: { selectedUser: user } });
                    }}
                  >
                    View
                  </button>

                </li>
              </ul>

            </Col>
            <Col xs="4" md="3" lg="3" xl="3">
              <button type="button" className="btn btn-success text-white" style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem", width: '80px', marginTop: '20px', marginLeft: '20px' }} id="button2">
                {user.gender}
              </button>
              <div>
                <img src={userImg} className="img-fluid rounded-start" style={{ color: '#fff', height: '80px', width: '80px', marginTop: '20px', marginLeft: '15px' }} alt='userImg' />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card> 
        
      </Col>
      ))}

      </Row>
    </div>
  )
}
export default UserCard;
