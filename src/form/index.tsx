import React, { ChangeEvent, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, 
         FormControl, FormControlLabel, Input, Radio, RadioGroup, TextField } from '@material-ui/core';
import Api from '../services/api';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/dist/client/router';
import useStyles from './style';
import validation from '../components/validation';

interface Task {
    guid: string,
    title: string,
    description: string
    situation: string
}
const TaskForm: React.FC = () => { 
    const { register, handleSubmit, formState: { errors } } = useForm<Task>({
        resolver: yupResolver(validation)
    });
    const classes = useStyles();
    const [ open, setOpen ] = useState(true);
    const router = useRouter();
    const [ model, setModel ] = useState<Task>({
    guid:'',
    title:'',
    description:'',
    situation:''
    });
const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModel({ ...model, [e.target.name] : e.target.value})
};
const formSubmitHandler: SubmitHandler<Task> = 
async () => {
    await Api.post('/tasks', model)
    closeModal()
};

const backlist = () => {
    router.push('/')   
};
const closeModal = () => {
    setOpen(false)
    backlist()
}

    return(
        <>
       <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm">
        <DialogTitle id="form-dialog-title"> Criar tarefa </DialogTitle>
        <DialogContent>  
        <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.root}>
            <div>
            <TextField 
                {...register('title')}                
                label="Nome da tarefa"
                variant="outlined"
                type="text" 
                name="title"
                value={model.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
                />{' '}
            </div>
                {errors.title && errors.title?.message && <small style={{color:"red", marginRight: '10px'}}>{errors.title.message}</small>}
            <div>
            <TextField 
                {...register('description')}
                label="Descrição da tarefa"
                variant="outlined"
                type="text" 
                name="description" 
                value={model.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
                />{' '}
             </div>
                  {errors.description && errors.description?.message && <small style={{color:"red", marginRight: '10px'}}>{errors.description.message}</small>}
              <div>
                <FormControl component="fieldset">
                    <RadioGroup                         
                        aria-label="gender" 
                        name="situation" 
                        value={model.situation} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}>
                    <FormControlLabel value="completed" control={<Radio />} label="completed" />
                    </RadioGroup>       
                </FormControl>

                 <FormControl component="fieldset">
                    <RadioGroup 
                        aria-label="gender" 
                        name="situation" 
                        value={model.situation} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}>
                    <FormControlLabel value="uncompleted" control={<Radio />} label="uncompleted" />
                    </RadioGroup>       
                </FormControl>            
              </div>
            <Button color="primary" onClick={closeModal} >Cancelar</Button>{' '}      
            <Button color="primary" type="submit">Salvar</Button>      
        </form>
        </DialogContent>
      </Dialog>
       </>
    );
}

export default TaskForm;