 import axios from 'axios';
 import React, { useEffect, useState } from 'react';
 import {Typography, IconButton, Avatar,
         CardActions, CardContent, CardHeader, Card } from '@material-ui/core';
 import { MdFavorite, MdShare, MdExpandMore, MdMoreVert } from 'react-icons/md';

 interface Task {
     guid: string,
     title: string,
     description: string,
     situation: string
 }
 
 const TaskList: React.FC = () => {         
       const [ tasks, setTasks ] = useState<Task[]>([]);
 
 useEffect(() => {    
     getAll()
 },[]);
 
 async function getAll(){
   const response = await axios.get("https://chronos.compraqui.app/api/tasks");
   console.log(response)
   setTasks(response.data);
 };
 function newTask(){
     alert('nova tarefa')
 };
 
 return (
     <div>
     {tasks.map(item => (
      <Card key={item.guid} >
          <CardHeader
              avatar={
          <Avatar onClick={newTask} aria-label="recipe" >
              +
          </Avatar>
              }
          action={
          
          <IconButton  aria-label="settings">
            <MdMoreVert className="iconMore" />
          </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
      />
      <CardContent>
          <Typography variant="body2" color="textPrimary" component="p" >
            <h1>{ item.title}</h1>
            <h3>{ item.description}</h3>
          </Typography>
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
     </div>
   );
 }
 
 export default TaskList;