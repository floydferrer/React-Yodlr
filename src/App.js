import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useItems from './hooks/useItems';
import Homepage from './Homepage';
import Signup from "./Signup";
import Admin from "./Admin";
import UserList from "./UserList";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  const[users, setUsers, isLoading, setIsLoading] = useItems();

  if(isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup users={users} />} />
          <Route exact path="/admin" element={<Admin userList={users} />} />
          <Route exact path="/users" element={<UserList users={users} />} />
          <Route exact path="/users/:id" element={<UserProfile users={users} />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;