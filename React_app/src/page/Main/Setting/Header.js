import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Header(props) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(props.userName);
    console.log('props', props);
  }, [props])

  const login = () => {
    props.navigate("login");
  }
  const search = () => {
    props.navigate("search");
  }
  return (
      <AppBar position="sticky" elevation={0} sx={{ pt:1.5, bgcolor:"#004ba0" }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <Button onClick={search} variant="h5" >
                <Typography color="inherit" variant="h5">
                  HYU 공지알리
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              {name != '' ?
                <Typography color="inherit">
                  {name}님, 안녕하세요!
                </Typography> :
                <Button onClick={login} color="inherit">
                  로그인 해주세요
                </Button>
              }
            </Grid>
          </Grid>
        </Toolbar>
        <Box component="div" position="static" elevation={0} sx={{ zIndex: 0, bgcolor:"#1976d2", mt:1 }}>
          <Tabs value={1} textColor="inherit">
              <Tab label="검 색" component={RouterLink} to="/search"  />
              <Tab label="설 정" component={RouterLink} to="/setting" />
          </Tabs>
        </Box>
      </AppBar>
  );
}

export default Header;
