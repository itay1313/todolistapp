import React from "react";
import './Styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from "./TodoList"
import { Route, Routes } from "react-router-dom";
import Navigation from './Nav'


const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route path='/todos' element={<TodoList />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </React.Fragment>
  )
}

const Profile = () => {
  return (
    <div>
      <h3>im profile</h3> </div>
  )
}

export default App