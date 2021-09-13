import React from 'react';
import TaskForm from '../src/form';
import Home from '../src/home';

const RegisterTask: React.FC = () => {
    return(
        <div>
            <Home/>
            <TaskForm/>
        </div>
    );
}

export default RegisterTask;