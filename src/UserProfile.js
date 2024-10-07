import React from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useFields from './hooks/useFields';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";
import './UserProfile.css'

const UserProfile = ({ users }) => {
  console.log(users);
  const _ = require('lodash');
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = _.findIndex(users, (e) => {
    return e.id == id;
  });

  const [formData, handleChange] = useFields({
    id: Number(id),
    email: users[idx].email,
    firstName: users[idx].firstName,
    lastName: users[idx].lastName,
    state: users[idx].state
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const itemList = await axios.put(`/users/${formData.id}`, formData);
    console.log(itemList)
    users[idx].id = formData.id;
    users[idx].email = formData.email;
    users[idx].firstName = formData.firstName;
    users[idx].lastName = formData.lastName;
    users[idx].state = formData.state;
    return navigate('/users');
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const itemList = await axios.delete(`/users/${formData.id}`);
    console.log(itemList)
    users.splice(idx, 1)
    return navigate('/users');
  }

  return (
    <div>
      <h2> User ID: {id}</h2>
      <h2> User: {users[idx].firstName} {users[idx].lastName}</h2>

    <Form className="col-md-4 mt-3 py-4 px-4 container-fluid bg-white rounded" onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="firstName" className="fw-bold">
            First Name
            </Label>
            <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="lastName" className="fw-bold">
            Last Name
            </Label>
            <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            />
        </FormGroup>
        <div className="d-grid gap-2">
            <Button color="primary">
                Update User
            </Button>
        </div>
    </Form>
    <Button color="danger" onClick={handleDelete}>
        Delete User
    </Button>
    <p className='all-users' onClick={() => navigate('/users')}>
        Users Page
    </p>
    </div>
  )
}

export default UserProfile
