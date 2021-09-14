import React, { MouseEvent, useEffect, useState } from 'react';
import {IconButton, CardHeader, Card, Button, Menu, Fade, MenuItem, 
        Grid, Typography, InputBase, CardContent} from '@material-ui/core';
import { MdCheck, MdDelete,MdEdit, MdMoreVert, MdSearch } from 'react-icons/md';
import { BiPlus} from 'react-icons/bi';
import { useRouter } from 'next/dist/client/router';
import { Task } from '../../services/interface';
import Api from '../../services/api';
import useStyle from './styles';

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
   const response = await Api.get("/tasks")
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
  router.push('/');
};
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  setMenuButton(e.currentTarget);
};

const handleClose = () => {
  setMenuButton(null);
};
 return (
   <>     
   <Grid container direction="column" justifyContent="center" alignItems='center'>
   <div className={classes.search}>
      <IconButton className={classes.iconButton} aria-label="search">
        <MdSearch />
      </IconButton>
      <InputBase
        className={classes.inputSearch}
        placeholder="Procurar tarefas"
      />
    </div>    
    <div className={classes.tarefas} >Tarefas</div> 
     {tasks.map(item => (
      <Card key={item.guid} className={classes.root}>
         <CardHeader
         action={
          <>           
         <IconButton onClick={handleClick}className={classes.iconToggle} >
           <MdMoreVert className="iconMore"/>
         </IconButton>          
         </>
         }
         title={item.title}/>
        
         <CardContent>
         <Typography className={classes.description} >
           {item.description}
          </Typography>
        </CardContent>

       {item.situation == 'completed' && 
         <Button className={classes.button}><MdCheck/>&nbsp;Concluido</Button> ||
         item.situation == 'uncompleted' && 
         <Button className={classes.button}> Em progresso</Button>
       }
       <Menu id="fade-menu" anchorEl={menuButton} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
         <MenuItem onClick={() => editTask(item.guid)}><MdEdit color='primary'/>&nbsp;Atualizar tarefa</MenuItem>{' '}
         <MenuItem onClick={() => deleteTask(item.guid)}><MdDelete color='primary'/>&nbsp;Remover tarefa</MenuItem>
       </Menu>
      </Card>
     ))} 
      <Button 
          className={classes.newBtn} 
          onClick={newTask} 
          variant='contained' 
          color='primary'>
            <BiPlus/>&nbsp;Nova tarefa
       </Button> 
      </Grid>
     
   </>   
   );
   
 }
 
 export default TaskList;