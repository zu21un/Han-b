import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';

import API from '@aws-amplify/api';
import { userByEmail } from '../../../graphql/queries';

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
  const [loginError, setLoginError] = useState('');
  // console.log(props)
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let sha256Password = sha256(data.get('password')+data.get('email'))
    console.log(sha256Password)
    
    API.graphql({query:userByEmail, variables:{email:email}})
        .then(res => {
            let userData = res.data.userByEmail.items
            if(userData.length != 0){
              let user = userData[0]
              if(user.password == sha256Password){
                props.handleUser(user.id);
                props.navigate("/setting")
              }else{
                setLoginError('비밀번호가 일치하지 않습니다.');
              }
            }else{
              setLoginError('입력하신 아이디가 일치하는 사용자가 없습니다.');
            }
        }).catch(e => console.log(e))
  };

  const signup = (event) => {
    props.navigate("signup");
  }
  const findpassword = (event) => {
    props.navigate("findpassword")
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <CssBaseline />
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" >
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mx:25 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormHelperText error={true}>{loginError}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={findpassword} variant="body2" sx={{ fontSize: 15 }}>
                  {"비밀번호 찾기"}
                </Link>
              </Grid>
              <Grid item xs>
                <Link onClick={signup} variant="body2">
                  {"회원가입"}
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