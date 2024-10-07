import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import './Admin.css'

const Admin = ({ userList }) => {
  const _ = require('lodash');
  const navigate = useNavigate();

  const [users, setUsers] = useState({userList});

  const handleActivate = async (e) => {
    const idx = _.findIndex(userList, (i) => {
      return i.id == e.target.id;
    });
    const user = userList[idx];
    const userData = {
      id: user.id, 
      email: user.email,
      firstName: user.firstName, 
      lastName: user.lastName, 
      state: user.state === 'pending' ? 'active' : 'pending'
    }
    await axios.put(`/users/${e.target.id}`, userData);
    user.state === 'pending' ? user.state = 'active' : user.state = 'pending'
    setUsers({userList});
  }

  return (
    <div>
      <section className="col-md-8 mt-4 container-fluid">
          <h2>Admin Dashboard:</h2>
          {userList.map(user => (
          <Card className='card mt-2' /*onClick={() => navigate(`/users/${user.id}`)}*/>
              <CardBody>
                  <CardTitle className="fw-bold">
                      {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardText>
                    {user.email}
                  </CardText>
                  <CardText className='card-state mb-0'>
                    State: {user.state}
                  </CardText>
                    <Form>
                      <FormGroup switch className='row d-flex justify-content-center'>
                        {user.state === 'active' && <Input
                          type="switch"
                          checked='true'
                          id={user.id}
                          onClick={handleActivate}
                        />}
                        {user.state === 'pending' && <Input
                          type="switch"
                          id={user.id}
                          onClick={handleActivate}
                        />}
                      </FormGroup>
                    </Form>
              </CardBody>
          </Card>
          ))}
          <p className='admin-nav' onClick={() => navigate('/')}>
            Homepage
          </p>
      </section>
    </div>
  )
}

export default Admin
