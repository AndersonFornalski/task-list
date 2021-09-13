import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, 
         FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import Api from '../../src/services/api';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';
import Home from '../../src/home';
import useStyles from './style';

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

const Edit: React.FC = () => { 
    const { register, handleSubmit, formState: { errors } } = useForm<Task>({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const router = useRouter();
    const { guid } : any = router.query;
    const [ model, setModel ] = useState<Task>({
    guid:'',
    title:'',
    description:'',
    situation:''
    });

useEffect(() => {
    if( guid != undefined){
        findTask(guid)
    }
},[guid]);

const findTask = async (guid: string) => {
    const response = await Api.get(`/tasks/${guid}`)
    setModel({
        guid:response.data.guid,
        title: response.data.title,
        description: response.data.description,
        situation: response.data.situation
    })
};

const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [e.target.name] : e.target.value
        })
    };

const formSubmitHandler: SubmitHandler<Task> = async () => {
        await Api.put(`/tasks`, model)
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
       <Home/>                                                                                                                                                                                                                                                                      
       <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm">
        <DialogTitle id="form-dialog-title"> EDITAR TAREFA </DialogTitle>
        <DialogContent> 
        <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.root} >
            <div>
            <TextField 
                {...register('title')}
                label="TITULO"
                variant="outlined"                
                type="text" 
                name="title"
                value={model.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                />{' '}
            </div>
                {errors.title && errors.title?.message && <small style={{color:"red", marginRight: '10px'}}>{errors.title.message}</small>}
            <div>
            <TextField 
                {...register('description')}
                label="DESCRICAO"
                variant="outlined"
                type="text" 
                multiline
                rows={4}
                name="description" 
                value={model.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                />{' '}
             </div>
                  {errors.description && errors.description?.message && <small style={{color:"red", marginRight: '10px'}}>{errors.description.message}</small>}
              <div>
                <FormControl component="fieldset">
                    <RadioGroup                         
                        name="situation" 
                        value={model.situation} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}>
                    <FormControlLabel value="completed" control={<Radio />} label="Completa" />
                    </RadioGroup>
                </FormControl>

                 <FormControl component="fieldset">
                    <RadioGroup 
                        name="situation" 
                        value={model.situation} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}>
                    <FormControlLabel value="uncompleted" control={<Radio />} label="Incompleta" />
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

export default Edit;