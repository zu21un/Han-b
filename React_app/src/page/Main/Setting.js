import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Setting() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <EmailOutlinedIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item>
              <Typography color="text.secondary" align="center">
                jwjoo03@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {/* 내 키워드 */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}>
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              >
                <Toolbar>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        내 키워드
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
          </Paper>
        </Grid>
        {/* 추가 가능한 키워드 */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}>
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              >
                <Toolbar>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        추가 가능한 키워드
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
