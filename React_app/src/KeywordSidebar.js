import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

let KeywordSidebar = () => <Box sx={{ bgcolor:'text.disabled' }}>
        <List>
            {generate(
                <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                    </IconButton>
                }
                >
                <ListItemText
                    primary="Single-line item"
                />
                </ListItem>,
            )}
        </List>
    </Box>


export default KeywordSidebar;