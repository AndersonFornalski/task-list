import React, { ChangeEvent, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, 
         FormControl, FormControlLabel, Input, Radio, RadioGroup } from '@material-ui/core';
import Api from '../services/api';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';

interface Task {
    guid: string,
    title: string,
    description: string
    situation: string
}

const schema = yup.object().shape({
    title: yup.string().min(4,"minimo 4 caracters")
                       .max(30, "maximo 10 caracteres")
                       .required("texto obrigatorio"),

    description: yup.string().min(5,"minimo 5 caracters")
                             .required(),
  });

const TaskForm: React.FC = () => { 
    const { register, handleSubmit, formState: { errors } } = useForm<Task>({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const [ model, setModel ] = useState<Task>({
    guid:'',
    title:'',
    description:'',
    situation:''
    });
function handleOnChange (e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name] : e.target.value
        })
    };

const formSubmitHandler: SubmitHandler<Task> = async () => {
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
        <DialogTitle id="form-dialog-title"> TAREFAS </DialogTitle>
        <DialogContent>  
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div>
            <input 
                {...register('title')}                
                placeholder="TITLE"
                type="text" 
                name="title"
                value={model.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
                />{' '}
            </div>
                {errors.title && errors.title?.message && <small style={{color:"red"}}>{errors.title.message}</small>}
            <div>
            <Input 
                {...register('description')}
                placeholder="DESCRIPTION"
                type="text" 
                name="description" 
                value={model.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
                />{' '}
             </div>
                  {errors.description && errors.description?.message && <small style={{color:"red"}}>{errors.description.message}</small>}
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
            <Button variant="contained" color="primary" onClick={closeModal} >Cancelar</Button>{' '}      
            <Button variant="contained" color="primary" type="submit">Salvar</Button>      
        </form>
        </DialogContent>
      </Dialog>
       </>
    );
}

export default TaskForm;