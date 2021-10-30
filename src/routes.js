import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/'
import Login from './pages/Login/'
import PrivateRoute from './services/private'
import Register from './pages/register/Register'
import RegisterCommunity from './pages/register/RegisterCommunity'
import PublicRoute from './services/public'
import Community from './pages/Community/'
import Post from './pages/Post/'
import ProfilePage from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import  Header  from './components/Header/index.js'
import { Search } from './components/SearchBar/styled'
import SearchBar from './components/SearchBar'




export default function RoutesList(){

    return(
        <BrowserRouter>
            <Header>
                <h1>
                    The Waystone Inn
                </h1>
                <SearchBar />
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