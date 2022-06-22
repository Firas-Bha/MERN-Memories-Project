import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from'@material-ui/core';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';

import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
      <Route path="/" exact  element={<Home/>} />
      <Route path="/auth" exact  element={<Auth/>} />

      </Routes>
     
    </Container>
  </BrowserRouter>
);
export default App;
