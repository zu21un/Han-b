import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


let KeywordSearchbar = () => 
    <Box  
        sx = {{ 
            bgcolor: 'info.main',
            display: 'inline-flex',
            width: 500,
            mt : 5,
            mb : 2
        }}
    >
        <Paper
            component="form"
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: 400,
                m: 2,
            }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search..."
                aria-label="Search..."
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    </Box>
    

export default KeywordSearchbar;