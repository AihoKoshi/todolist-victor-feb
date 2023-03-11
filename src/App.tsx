import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.module.css';
import {TaskType, Todolist} from "./Todolist";
import s from './App.module.css'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    let todolistTitle = 'What to learn';
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
        {id: v1(), title: '.map()', isDone: true},
        {id: v1(), title: '.filter()', isDone: true},
        {id: v1(), title: 'useState', isDone: true},
        {id: v1(), title: 'useRef', isDone: true},
        {id: v1(), title: 'switch', isDone: true},
        {id: v1(), title: 'В одну строчку', isDone: true},
        {id: v1(), title: 'bubbling', isDone: false},
        {id: v1(), title: 'factorial', isDone: false},
    ]);

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((el) => el.id !== taskId))
    }

    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')
    const filterTasks = (filterValue: FilterValuesType) => setFilter(filterValue)
    // вариант в одну строчку
    let filteredTasks = tasks.filter(el => filter === 'active' ? !el.isDone : filter === 'completed' ? el.isDone : 'all')

    // // вариант со switch
    // const getFilteredTasks = () => {
    //     switch (filter) {
    //         case 'active':
    //             return tasks.filter(el => !el.isDone)
    //         case 'completed':
    //             return tasks.filter(el => el.isDone)
    //         default:
    //             return tasks
    //     }
    // }
    // const filteredTasks: TaskType[] = getFilteredTasks()
    // // и отправляем filteredTasks в Todolist через tasks={filteredTasks}

    return (
        //UI
        <div className={s.App}>
            <Todolist
                todolistTitle={todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
