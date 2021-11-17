import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function KeywordTitle() {
    return <Box 
        sx = {{ display: 'inline-flex' }}
        >
        <Typography variant="h4">
        어떤 정보를 메일로 받길 원하시나요?
        </Typography>
    </Box>
}

export default KeywordTitle