import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
//import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import {signin,signup} from '../../actions/auth';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const state = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const[formData,setFormData] = useState(initialState); //bech nchoufoou les donnes eli 3adinehom houma nafshom wale
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {

      e.preventDefault(); // we dont prefer reloads
      if (isSignup) {
        dispatch(signup(formData, navigate));
      } else {
        dispatch(signin(formData, navigate));
      }
    };
    const handleChange = (e) => {
      setFormData({...formData,[e.target.name]: e.target.value}) //update only the input that we are managing

    };
    const switchMode = () => {

        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);

      };

      const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: AUTH, data: { result, token } });
    
          navigate('/'); // bech tarja3 lel home
        } catch (error) {
          console.log(error);
        }
        console.log(res);
      };
    
      const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later');
      };
 
      gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "196614559927-u94bif7nf8f7cnqskos8rnnbaoe8mpvu.apps.googleusercontent.com",
          plugin_name: "chat",
        });
      });

  return (
   
 <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="196614559927-u94bif7nf8f7cnqskos8rnnbaoe8mpvu.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
              
          
            )}
        
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

