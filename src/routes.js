import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home/';
import PrivateRoute from './services/private';
import Register from './pages/register/Register';
import RegisterCommunity from './pages/register/RegisterCommunity';
import PublicRoute from './services/public';
import Community from './pages/Community/';
import Post from './pages/Post/';
import ProfilePage from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import  Header  from './components/Header/index.js';
import SearchBar from './components/SearchBar';
import { getUser } from './storage/utils';




export default function RoutesList(){

    return(
        <BrowserRouter>
            <Header>
                <span className='title'>
                    The Waystone Inn
                </span>
                <SearchBar />
                <a href='/'>Home</a>
                <a href={`/profile/${getUser()}`}>Profile</a>

            </Header>
            <Routes>
                <PublicRoute path='/login' element={<Login />}/>
                <PrivateRoute path='/' element={<HomePage />} />              
                <Route path='/community/:id/:page' element={<Community/>}/>
                <Route path="/register" element={<Register />}/>
                <PrivateRoute path="/register/community" element={<RegisterCommunity />}/>
                <Route path='/post/:id' element={<Post />}/>
                <PrivateRoute path='/profile/:user' element={<ProfilePage />}/>
                <PrivateRoute path='/:user/edit' element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
    )
}