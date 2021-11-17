import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


let KeywordRecommend = () => 
    <Box sx = {{ display: 'inline-flex' }}>
        <Stack spacing={2} direction="row">
            <Button variant="contained" color="warning"># 장학금</Button>
            <Button variant="contained" color="warning"># 삼성</Button>
            <Button variant="contained" color="warning"># 구글</Button>
        </Stack>
    </Box>


export default KeywordRecommend;