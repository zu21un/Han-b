import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import Header from './Header';
import Login from './Login';
import API from '@aws-amplify/api';
import { getUser, listKeywords } from '../../../graphql/queries'

let theme = createTheme({
    palette: {
    primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
    },
    },
    typography: {
    h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
    },
    },
    shape: {
    borderRadius: 8,
    },
    components: {
    MuiTab: {
        defaultProps: {
        disableRipple: true,
        },
    },
    },
    mixins: {
    toolbar: {
        minHeight: 48,
    },
    },
});
  
theme = {
    ...theme,
    components: {
        MuiDrawer: {
        styleOverrides: {
            paper: {
            backgroundColor: '#081627',
            },
        },
        },
        MuiButton: {
        styleOverrides: {
            root: {
            textTransform: 'none',
            },
            contained: {
            boxShadow: 'none',
            '&:active': {
                boxShadow: 'none',
            },
            },
        },
        },
        MuiTabs: {
        styleOverrides: {
            root: {
            marginLeft: theme.spacing(1),
            },
            indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: theme.palette.common.white,
            },
        },
        },
        MuiTab: {
        styleOverrides: {
            root: {
            textTransform: 'none',
            margin: '0 16px',
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up('md')]: {
                padding: 0,
                minWidth: 0,
            },
            },
        },
        },
        MuiIconButton: {
        styleOverrides: {
            root: {
            padding: theme.spacing(1),
            },
        },
        },
        MuiTooltip: {
        styleOverrides: {
            tooltip: {
            borderRadius: 4,
            },
        },
        },
        MuiDivider: {
        styleOverrides: {
            root: {
            backgroundColor: 'rgb(255,255,255,0.15)',
            },
        },
        },
        MuiListItemButton: {
        styleOverrides: {
            root: {
            '&.Mui-selected': {
                color: '#4fc3f7',
            },
            },
        },
        },
        MuiListItemText: {
        styleOverrides: {
            primary: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeightMedium,
            },
        },
        },
        MuiListItemIcon: {
        styleOverrides: {
            root: {
            color: 'inherit',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            '& svg': {
                fontSize: 20,
            },
            },
        },
        },
        MuiAvatar: {
        styleOverrides: {
            root: {
            width: 32,
            height: 32,
            },
        },
        },
    },
};

export default function LoginPage(props) {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: '100%' }}>
            <CssBaseline />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header navigate={props.navigate} />
                <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                    <Login handleUser={props.handleUser} navigate={props.navigate}/>
                </Box>
            </Box>
        </Box>
    </ThemeProvider>
  );
}
