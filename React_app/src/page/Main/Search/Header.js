import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Header(props) {
  return (
      <AppBar position="sticky" elevation={0} sx={{ pt:1.5, bgcolor:"#004ba0" }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                HYU 공지알리
              </Typography>
            </Grid>
            <Grid item>
              {props.userInfo.Name != '' ?
                <Typography color="inherit">
                  {props.userInfo.Name}님, 안녕하세요!
                </Typography> :
                <Typography color="inherit">
                  로그인 해주세요
                </Typography>
              }
            </Grid>
          </Grid>
        </Toolbar>
        <Box component="div" position="static" elevation={0} sx={{ zIndex: 0, bgcolor:"#1976d2", mt:1 }}>
          <Tabs value={0} textColor="inherit">
              <Tab label="검 색" component={RouterLink} to="/search"  />
              <Tab label="설 정" component={RouterLink} to="/setting" />
          </Tabs>
        </Box>
      </AppBar>
  );
}

export default Header;