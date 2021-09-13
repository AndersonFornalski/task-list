 import React, { useEffect, useState } from 'react';
 import {Typography, IconButton, Avatar,
         CardActions, CardContent, CardHeader, Card, Button } from '@material-ui/core';
 import { MdFavorite, MdShare, MdExpandMore, MdMoreVert } from 'react-icons/md';
 import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Api from '../services/api';

 interface Task {
     guid: string,
     title: string,
     description: string,
     situation: string
 }
 
 const TaskList: React.FC = () => {         
       const [ tasks, setTasks ] = useState<Task[]>([]);
       const router = useRouter();
 
 useEffect(() => {    
     getAll()
 },[]);
 
 async function getAll(){
   const response = await Api.get("/tasks");
   console.log(response)
   setTasks(response.data);
 };
 function newTask(){
    router.push('/tarefa');
 };

 function editTask(guid: string) { 
    router.push(`/tarefa/${guid}`)
};

async function deleteTask(guid: string){
  await Api.delete(`/tasks/${guid}`)
  getAll()
};
 
 return (
     <div>
     {tasks.map(item => (
      <Card key={item.guid} >
          <CardHeader
              avatar={
          <Avatar>
              ++
          </Avatar>
              }
          action={
          
            <IconButton onClick={() => editTask(item.guid)} aria-label="settings">
            <MdMoreVert className="iconMore" />
          </IconButton>
          }
          title={ item.title}
          subheader={item.description}
      />
      <CardContent>
        <h1>{ item.title}</h1>
        <h3>{ item.description}</h3>
         
            <Button onClick={newTask}variant='contained' color='primary'>NOVA TAREFA</Button>{' '} 
        
            <Button onClick={() => deleteTask(item.guid)} variant='contained' color='secondary'>EXCLUIR</Button>         
      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <MdFavorite />
          </IconButton>
          <IconButton aria-label="share">
            <MdShare />
          </IconButton>
          <IconButton>
            <MdExpandMore />
          </IconButton>
      </CardActions>
     </Card>
     ))} 
        <Button onClick={newTask} variant='contained' color='primary'>NOVA TAREFA</Button> 
     </div>
   );
 }
 
 export default TaskList;