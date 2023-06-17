import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../App';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GuestHome from '../../screens/GuestHome';
import UserHome from '../../screens/UserHome';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import Navbar from './Navbar';
import Profile from '../../screens/Profile';
import CreateItem from '../../screens/CreateItem';

export default function Routing() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            {user ? (
                <Routes>
                    <Route exact path='/' element={<UserHome />} />
                    <Route exact path='profile' element={<Profile />} /> 
                    <Route exact path='createitem' element={<CreateItem />} />
                </Routes>
            ) : (
                <Routes>
                    <Route exact path='/' element={<GuestHome />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                </Routes>
            )}
        </Router>
    )
}