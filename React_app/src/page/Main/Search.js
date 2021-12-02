import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';




export default function Search() {
  const [keyword, setKeyword] = useState('');

  const handleChange = ({ target: { value } }) => setKeyword(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(keyword)
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
            <Grid 
            component="form" 
            onSubmit={handleSubmit} 
            container 
            spacing={2} 
            alignItems="center"
            > 
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="키워드를 검색하세요"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default', mt: 0.5 },
                  }}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button 
                  type="submit"
                  variant="contained" sx={{ mr: 1 }}
                  onSubmit={handleSubmit}>
                  검 색
                </Button>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        검색 결과가 없습니다
      </Typography>
    </Paper>
  );
}
