import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import './UserList.css'

const UserList = ({ users }) => {
  const navigate = useNavigate();

  console.log(users);
  return (
    <div>
      <section className="col-md-8 mt-4 container-fluid">
          <h2>Users:</h2>
          {users.map(user => (
          <Card className='card-user mt-2' onClick={() => navigate(`/users/${user.id}`)}>
              <CardBody>
                  <CardTitle className="fw-bold">
                      {user.firstName} {user.lastName}
                  </CardTitle>
              </CardBody>
          </Card>
          ))}
          <p className='signup-nav' onClick={() => navigate('/')}>
            Homepage
          </p>
      </section>
    </div>
  )
}

export default UserList
