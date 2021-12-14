import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';


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

export default function FindPassword(props) {
  const handleBack = (event) => {
    event.preventDefault();
    props.navigate("login");
  }
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
            mx: 30
          }}
        >
          <Typography component="h1" variant="h5">
            {"비밀번호 재설정은 이메일 인증 기능이 필요하여 개발 중입니다."}
          </Typography>
          <Typography component="h2" variant="h5">
            {"우선 다른 이메일로 다시 가입해주세요:)"}
          </Typography>
          <Button
            type="normal"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Paper>
    </ThemeProvider>
  );
}