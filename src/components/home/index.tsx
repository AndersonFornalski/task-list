import React, { useState } from 'react';
import { Avatar, Button, Divider, ListItemAvatar, ListItemText, ListItem, IconButton, 
         List, Toolbar, AppBar, CssBaseline, Drawer, useTheme } from '@material-ui/core';
import { MdMenu,MdChevronLeft, MdChevronRight, MdInfo, MdAccountCircle,} from 'react-icons/md';
import { ImListNumbered } from 'react-icons/im';
import useStyles from './styles';
import clsx from 'clsx';
import TaskList from '../taskList';
import { useRouter } from 'next/dist/client/router';

const Home: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MdMenu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <MdChevronLeft /> : <MdChevronRight />}
          </IconButton>
        </div>
       
        <List >
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <MdAccountCircle />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <div className={classes.textAvatar}>Nome</div>
              <div className={classes.textAvatar2}>Função</div>
            </ListItemText>
          </ListItem>
        </List>
        <Divider className={classes.divider}/>

        <List>          
        <ListItem>
           <Button 
              className={classes.list} 
              onClick={() => router.push('/')} 
              color='secondary'> 
              <ImListNumbered className={classes.iconList}/>Tarefas
           </Button> 
        </ListItem>  
        <ListItem>
          <Button
              className={classes.list} 
              onClick={() => router.push('/')} 
              color='secondary'> 
              <MdInfo className={classes.iconList}/>Sobre
          </Button> 
        </ListItem>  
        </List>   
      </Drawer>
      
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        >
        <div className={classes.drawerHeader} />
          <TaskList/>         
      </main>
    </div>
  );
}

export default Home;