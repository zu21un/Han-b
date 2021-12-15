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
import {listNotifications} from '../../../graphql/queries'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';



export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [notisPerPage, setNotisPerPage] = useState(5);
  const [page, setPage] = useState(0)


  const handleChange = ({ target: { value } }) => setKeyword(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (keyword.length == 0){
      setSearchList([]);
      setSearchKeyword(keyword);
    } 
    
    else{
      let finish = true;
      let token = ""
      let default_payload = {};
      let nowList = [];
      
      
      while(finish){
        if (token == ""){
          default_payload = {}
        } else{
          default_payload = {
            nextToken: token
          }
        }        

        await API.graphql({query:listNotifications, variables:default_payload})
            .then(res => {
              let notiList = []
              if (res.data.listNotifications.nextToken) {
                token = res.data.listNotifications.nextToken
              } else{
                finish = false;
              }
              for(let item of res.data.listNotifications.items){
                if(item.name.includes(keyword)){
                  notiList.push(item)
                }
              }
              if (notiList.length != 0){
                notiList = notiList.sort((a,b) => new Date(b.date) - new Date(a.date));
              }
              
              for( let noti of notiList){
                nowList.push(noti)
              }
              // setSearchList(nowList);
            }).catch(e => {
              console.log(e)
            })
            console.log('제발')
      }
      console.log(keyword)
      setSearchKeyword(keyword);
      setSearchList(nowList);

    }
  }

  const handleChangePage = (event, newPage) =>{
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event)=>{
    setNotisPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const SearchResult = () => {
    return(
        searchList.length != 0 &&
        <Paper sx={{m:1}}>
          <TableContainer component={Paper} elevation={0} sx={{border:'1px'}}>
            <Table sx={{ width: 98/100 }} align="center" aria-label="simple table" elevation={0} >
              <TableHead>
                <TableRow  >
                  <TableCell sx={{width:'7%'}} align="center">번호</TableCell>              
                  <TableCell sx={{width:'63%'}} align="center">공지 제목</TableCell>
                  <TableCell sx={{width:'12%'}} align="center">날짜</TableCell>
                  <TableCell sx={{width:'18%'}} align="center">출처</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {searchList
                .slice(page* notisPerPage, page*notisPerPage + notisPerPage)
                .map((noti, key) => (
                  <TableRow
                    key={noti.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">
                      {page*notisPerPage +key+1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link color="text.primary" fontSize="14px" target="_blank" href={noti.link} underline="none">
                        {noti.name} 
                      </Link>
                    </TableCell>
                    <TableCell align="center">{noti.date}</TableCell>
                    <TableCell align="center">{noti.organization.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={searchList.length}
            rowsPerPage={notisPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={"표시할 공지 수"}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
    );
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
                  }}
                  sx = {{ mt:0.5 }}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button 
                  type="submit"
                  variant="contained" sx={{ mr: 0.5, bgcolor:"#2D75B7" }}
                  onSubmit={handleSubmit}
                  >
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
            {searchKeyword == "" ? "" : "\"" + searchKeyword + "\""} 검색 결과가 없습니다
          </Typography>
        }
        <SearchResult />
      </Box>
    </Paper>
  );
}
