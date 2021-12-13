import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import {API} from 'aws-amplify'
import {listNotifications, listUsers} from '../../../graphql/queries'


export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleChange = ({ target: { value } }) => setKeyword(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (keyword.length == 0){
      setSearchList([]);
      setSearchKeyword(keyword);
    } 
    
    else{
      API.graphql({query:listNotifications, variables:{}})
      .then(res => {
        let notiList = []
        for(let item of res.data.listNotifications.items){
          if(item.name.includes(keyword)){
            notiList.push(item)
          }
        }
        setSearchList(notiList);
        console.log(notiList)
      }).then(() => {
        setSearchKeyword(keyword);
      }).catch(e => {
        console.log(e)
      })
    }
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
                    sx: { fontSize: 'default', mt: 1 },
                  }}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button 
                  type="submit"
                  variant="contained" sx={{ mr: 0.5 }}
                  onSubmit={handleSubmit}>
                  검 색
                </Button>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Box item sx={{ 
        textAlign:'left',
        pb: 2
        }}>
        { searchList.length > 0 ?
          <Typography sx={{ mt:2, mb: 0.5 }} color="text.primary" align="center">
            "{searchKeyword}" 에 대한 검색 결과 : {searchList.length} 건
          </Typography>
          :
            <Typography sx={{ mt: 5, mb: 3, mx: 2 }} color="text.secondary" align="center">
              {searchKeyword} 검색 결과가 없습니다
            </Typography>
        }
        { searchList.length > 0 ?
            searchList.map((item, key, idx) => {
              return  <div sx={{textAlign:'left'}} key={key}>
                        <Link sx={{ mx: 8 }} color="text.secondary" fontSize="14px" target="_blank" href={item.link} underline="none" key={key}>
                          {item.name + ' | ' + item.date.substring(0,10) + ' | ' + item.organization.name} 
                        </Link>
                      </div>
            })
            : ""
        }
      </Box>
    </Paper>
  );
}
