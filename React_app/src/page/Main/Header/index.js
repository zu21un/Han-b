import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Header(props) {
  const login = () => {
    props.navigate("login");
  }
  const search = () => {
    props.navigate("search");
  }
  const signup = () => {
    props.navigate("signup");
  }
  return (
      <AppBar position="sticky" elevation={0} sx={{ pt:1.5, bgcolor:"#004ba0" }}>
        <Toolbar>
        <Grid container alignItems="center">
            <Grid item xs={6} sx={{ textAlign:'left' }}>
              <Button onClick={search} variant="h5" >
                <Typography color="inherit" variant="h4">
                  Han:b
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ textAlign:'right' }}>
              {props.userInfo.Name !== '' ?
                <Typography color="inherit" sx={{ fontSize: 16 }}>
                  {props.userInfo.Name} 님, 안녕하세요!
                </Typography> :
                <>
                  <Button onClick={login} color="inherit" sx={{ fontSize: 16 }}>
                    로그인
                  </Button>
                  <Button onClick={signup} color="inherit" sx={{ fontSize: 16 }}>
                    회원가입
                  </Button>
                </>   
              }
            </Grid>
          </Grid>
        </Toolbar>
        <Box component="div" position="static" elevation={0} sx={{ zIndex: 0, bgcolor:"#1976d2", mt:1 }}>
          <Tabs value={props.select} textColor="inherit" variant="fullWidth">
              <Tab label="키워드 검색" component={RouterLink} to="/search" sx={{ fontSize: 18 }} />
              <Tab label="키워드 알람 설정" component={RouterLink} to="/setting" sx={{ fontSize: 18 }} />
          </Tabs>
        </Box>
      </AppBar>
  );
}

export default Header;