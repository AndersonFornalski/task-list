import React, { useEffect, useState } from 'react';
import {IconButton, Typography, CardContent, CardHeader, 
Card, Button, Menu, Fade, MenuItem } from '@material-ui/core';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import { useRouter } from 'next/dist/client/router';
import Api from '../services/api';
//import useStyle from './styles';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";


const useStyle = makeStyles((theme: Theme) =>
createStyles({
    root: {
      maxWidth: '400px',
      height: '100px',
      color: purple[300],
      backgroundColor: blue[800],
      marginBottom:'20px',
      borderRadius:'30px',
      fontWeight:'bolder'
    },
    
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
  }),
);

interface Task {
     guid: string,
     title: string,
     description: string,
     situation: string
 }
 
const TaskList: React.FC = () => {
       const classes = useStyle();   
       const [ menuButton, setMenuButton ] = useState<null | HTMLElement>(null);
       const open = Boolean(menuButton);      
       const [ tasks, setTasks ] = useState<Task[]>([]);
       const router = useRouter();
 
 useEffect(() => {    
     getAll()
 },[]);
 
const getAll = async () => {
   const response = await Api.get("/tasks");
   setTasks(response.data);
 };
const newTask = () => {
    router.push('/tarefa');
 };

const editTask = (guid: string) => { 
    router.push(`/tarefa/${guid}`)
};

const deleteTask = async (guid: string) => {
  await Api.delete(`/tasks/${guid}`)
  getAll()
};

const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  setMenuButton(e.currentTarget);
};

const handleClose = () => {
  setMenuButton(null);
};
 
 return (
     <div>
     {tasks.map(item => (
      <Card key={item.guid} >
          <CardHeader
          action={          
          <IconButton onClick={handleClick} aria-label="settings" aria-controls="long-menu" aria-haspopup="true" >
            <MdMoreVert className="iconMore" />
          </IconButton>          
          }
          title={ item.title}
          subheader={item.description}
      />
      <Menu id="fade-menu" anchorEl={menuButton} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={() => editTask(item.guid)}><MdEdit color='primary'/>&nbsp;Editar Tarefa</MenuItem>
        <MenuItem onClick={() => deleteTask(item.guid)}><MdDelete color='primary'/>&nbsp;Excluir tarefa</MenuItem>
      </Menu>
     </Card>
     ))} 
        <Button onClick={newTask} variant='contained' color='primary'>NOVA TAREFA</Button> 
     </div>
   );
 }
 
 export default TaskList;