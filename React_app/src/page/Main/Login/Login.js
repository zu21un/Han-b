import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormHelperText from '@mui/material/FormHelperText';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';

import API from '@aws-amplify/api';
import { listUsers } from '../../../graphql/queries';

const sha256 = require('js-sha256');

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://cs.hanyang.ac.kr/">
        Software Studio 2
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Login(props) {
  const [loginSuccess,setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  console.log(props)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let sha256Password = sha256(data.get('password')+data.get('email'))
    
    API.graphql({query:listUsers, variables:{}})
        .then(res => {
            let userData = res.data.listUsers.items
            console.log(userData)
            for( let user of userData){
              console.log(data.get('email'))
              console.log(user.email)
              console.log(user.id)
              if(user.email == email && user.password == sha256Password){
                props.setUserId(user.id);
                setLoginSuccess(true)
                break;
              }
            }
            if(loginSuccess){
              console.log('로그인 성공')
              props.navigate("/setting")
            }
            else{
              setLoginError('입력하신 정보에 해당하는 사용자가 없습니다.');
            }
        }).catch(e => console.log(e))
  };

  const onLoginSuccess = (event) => {
    console.log(event)
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <FormHelperText error={true}>{loginError}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLoginSuccess}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="findpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Paper>
    </ThemeProvider>
  );
}