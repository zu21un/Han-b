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

import logo from '../../../logo/logo_hanb_white.png'
import logo2 from '../../../logo/logo_hanb_long2.png'
import logo3 from '../../../logo/logo_hanb_long3.png'

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
      <AppBar position="sticky" elevation={0} sx={{ py:0.5,  color:"white",bgcolor:"#003F75"}}>
        <Toolbar>
        <Grid container alignItems="center">
            <Grid item xs={8} sx={{ textAlign:'left' }}>
              <Box display="flex" justifyContent="flex-start" alignItems="center" gap="100px">
                <Button onClick={search} variant="h5" >
                  <img src={logo3} width='289' height='51' />
                  {/* width:height -> 17:3 */}
                </Button>
                <Tabs value={false} textColor="white">
                  <Tab label="검 색" component={RouterLink} to="/search" sx={{ fontSize: 18 }} />
                  <Tab label="설 정" component={RouterLink} to="/setting" sx={{ fontSize: 18 }} />
                </Tabs>
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ textAlign:'right' }}>
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
        {/* <Box  position="static" elevation={0} sx={{ zIndex: 0, bgcolor:"#E6EDEF", color:"text.secondary", mt:0.5 }}>
          
        </Box> */}
      </AppBar>
  );
}

export default Header;