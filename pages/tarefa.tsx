import React from 'react';
import TaskForm from '../src/form';
import TaskList from '../src/taskList';

const RegisterTask: React.FC = () => {
    return(
        <div>
            <TaskList/>
            <TaskForm/>
        </div>
    );
}

export default RegisterTask;