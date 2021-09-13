import React, { useEffect, useState } from 'react';
import {IconButton, CardHeader, Card, Button, Menu, Fade, MenuItem } from '@material-ui/core';
import { MdCheck, MdDelete, MdEdit, MdMoreVert, MdSupervisorAccount } from 'react-icons/md';
import { useRouter } from 'next/dist/client/router';
import Api from '../services/api';
import useStyle from './styles';

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
     <>
     {tasks.map(item => (
      <Card key={item.guid} className={classes.root}>
          <CardHeader
          action={          
          <IconButton onClick={handleClick} aria-label="settings" aria-controls="long-menu" aria-haspopup="true" >
            <MdMoreVert className="iconMore" />
          </IconButton>          
          }
          title={ item.title}
          subheader={item.description}
      />  
      {item.situation == 'completed' && 
        <Button  className={classes.button}><MdCheck/>&nbsp;Concluido</Button> ||
        item.situation == 'uncompleted' && 
        <Button  className={classes.button}> Em progresso</Button>
      }
      <Menu id="fade-menu" anchorEl={menuButton} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={() => editTask(item.guid)}><MdEdit color='primary'/>&nbsp;Editar Tarefa</MenuItem>{' '}
        <MenuItem onClick={() => deleteTask(item.guid)}><MdDelete color='primary'/>&nbsp;Excluir tarefa</MenuItem>
      </Menu>
     </Card>
     ))} 
        <Button onClick={newTask} variant='contained' color='primary'>NOVA TAREFA</Button> 
     </>
   );
 }
 
 export default TaskList;