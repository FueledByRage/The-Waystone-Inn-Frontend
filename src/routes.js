import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home/';
import PrivateRoute from './services/private';
import Register from './pages/register/Register';
import RegisterCommunity from './pages/register/Community/RegisterCommunity';
import PublicRoute from './services/public';
import Community from './pages/Community/';
import Post from './pages/Post/';
import ProfilePage from './pages/Profile';
import  Header  from './components/Header/index.js';
import SearchBar from './components/SearchBar';
import { getUser } from './storage/utils';
import CommunityDashboard  from './pages/CommunityDashboard';




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
                <Route path='/login' element={<Login />}/>
                <Route path='/' element={<HomePage />} />              
                <Route path='/community/:id/:page' element={<Community/>}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/register/community" element={<RegisterCommunity />}/>
                <Route path='/post/:id' element={<Post />}/>
                <Route path='/profile/:user' element={<ProfilePage />}/>
                <Route path='/dashboard' element={<CommunityDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}