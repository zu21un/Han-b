import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { blue } from '@mui/material/colors';

import {API} from 'aws-amplify';
import {userByEmail} from '../../../graphql/queries';
import {createUser} from '../../../graphql/mutations';
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

export default function SignUp(props) {

  const [nickName, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(()=>{
    if (nickName != '' && email != '' && password != '' && checkbox){
      setDisabled(false);
    } else{
      setDisabled(true);
    }
  },[nickName, email, password, checkbox])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let nickname = data.get('nickname');
    let email = data.get('email');
    let password = sha256(data.get('password') + email);

    API.graphql({query:userByEmail, variables:{email:email}})
      .then((res)=>{
        if (res.data.userByEmail.items.length != 0){
          setSignupError('*입력하신 이메일은 존재하는 이메일입니다.')
          return;
        }else{
          return API.graphql({query:createUser, variables:{input: {name:nickname, alarmTime:'0900', email:email, password:password}}})
        }
      })
      .then((res) => {
        console.log('res', res)
        if(res){
          props.handleUser(res.data.createUser.id);
          props.navigate("login");
        }
      })
      .catch((e)=>{
        console.log(e)
      })
    // 
  };

  const nicknameChange = (e) =>{
    setNickname(e.target.value)
  }
  const emailChange = (e) =>{
    setEmail(e.target.value)
  }
  const passwordChange = (e) =>{
    setPassword(e.target.value)
  }
  const checkboxChange = (e) =>{
    setCheckbox(e.target.checked)
  }
  const login = (e)=>{
    props.navigate("login")
  }
  const handleBack = (event) => {
    event.preventDefault();
    props.navigate("login");
  }
  let checkboxLabel = '이메일 정보 제공에 대해서 동의합니다.'
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mx:30, mt: 3 }}>
            <TextField
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoComplete="nickname"
              onChange={nicknameChange}
              sx = {{my:1}}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={emailChange}
              sx = {{my:1}}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={passwordChange}
              sx = {{my:1}}
            />
            <FormControlLabel
              control={<Checkbox value="allowEmail" onChange={checkboxChange} color="primary" />}
              label={checkboxLabel}
            />
            <Typography variant="subtitle2" color={blue[500]} align="center">
              {"공지사항 발송 외에는 이메일을 사용하지 않습니다."}
            </Typography>
            <FormHelperText error={true}>{signupError}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={disabled}
            >
              Sign Up
            </Button>
            <Button
            fullWidth
            variant="contained"
            sx={{ }}
            onClick={handleBack}
            >
              Back
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={login} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Paper>
    </ThemeProvider>
  );
}