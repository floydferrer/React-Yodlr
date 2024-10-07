import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFields from './hooks/useFields';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";
import './Signup.css';

const Signup = ({ users }) => {
  const navigate = useNavigate();

  const [formData, handleChange] = useFields({
    email: "",
    firstName: "",
    lastName: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(users)
    console.log(formData)
    const itemList = await axios.post(`/users`, {...formData, id: (users.length + 1).toString(), state: 'pending'});
    console.log(itemList)
    users.push({
        id: itemList.data.id,
        email: itemList.data.email,
        firstName: itemList.data.firstName,
        lastName: itemList.data.lastName,
        state: itemList.data.state
    })

    return navigate('/users');
  }

  return (
    <div>
        <h1>Yodlr Registration Portal</h1>
        <Form className="col-md-4 mt-3 py-4 px-4 container-fluid bg-white rounded" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="firstName" className="fw-bold">
                First Name
                </Label>
                <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName" className="fw-bold">
                Last Name
                </Label>
                <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label for="email" className="fw-bold">
                Email
                </Label>
                <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                />
            </FormGroup>
            <div className="d-grid gap-2">
                <Button color="primary">
                    Submit
                </Button>
            </div>
        </Form>
        <p className='signup-nav' onClick={() => navigate('/')}>
            Homepage
        </p>
    </div>
  )
}

export default Signup
