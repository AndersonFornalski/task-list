import React from 'react';
import TaskForm from '../src/components/form';
import Home from '../src/components/home';

const RegisterTask: React.FC = () => {
    return(
        <div>
            <Home/>
            <TaskForm/>
        </div>
    );
}

export default RegisterTask;