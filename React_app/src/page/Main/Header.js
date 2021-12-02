import * as React from 'react';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



function Header() {
  const [tabvalue, setTabvalue] = useState(0)
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} sx={{ py:1.5, bgcolor:"#004ba0" }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                HYU 공지알리
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0, bgcolor:"#1976d2" }}>
          <Tabs value={tabvalue} textColor="inherit">
            <Link underline="none" component={RouterLink} to="/main/search">
              <Tab label="검 색" />
            </Link>
            <Link underline="none" component={RouterLink} to="/main/setting">
              <Tab label="설 정" component={RouterLink} to="/main/setting"/>
            </Link>
          </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
