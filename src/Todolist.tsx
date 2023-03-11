import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import s from './App.module.css'
import {TasksList} from "./TasksList";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTasks: (filterValue: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistTitle, tasks, removeTask, filterTasks, addTask} = props;

    let [title, setTitle] = useState<string>('');

    const addTaskOnClickHandler = () => {
        title.length && !buttonDisabled && addTask(title.trim())
        setTitle('')
    }
    const inputOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && title.trim() && addTaskOnClickHandler()
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const inputError = () => {
        return !title.length
            ? <div>Title is required</div>
            : title.length > 7
                ? <div>Title shouldn't exceed 7 characters</div>
                : ''
    }
    const buttonDisabled = !title.trim().length || title.trim().length > 7


    const filterAllTasks = () => filterTasks('all')
    const filterActiveTasks = () => filterTasks('active')
    const filterCompletedTasks = () => filterTasks('completed')

    return (
        <div className={s.Todolist}>
            <h3>{todolistTitle}</h3>
            <div>
                <input value={title} onChange={inputOnChangeHandler} onKeyDown={inputOnKeyDownHandler}/>
                <button disabled={buttonDisabled} onClick={addTaskOnClickHandler}>+</button>
                <div style={{color: 'hotpink'}}>{inputError()}</div>
            </div>
            <TasksList tasks={tasks} removeTask={removeTask}/>
            <div>
                <button onClick={filterAllTasks}>All</button>
                <button onClick={filterActiveTasks}>Active</button>
                <button onClick={filterCompletedTasks}>Completed</button>
            </div>
        </div>
    )
}

// const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
// const addTask = () => {
// addTaskInput.current && addTask(addTaskInput.current.value)
// }
// при этом на input в разметке вешаем ярлык ref={addTaskInput} и на onClick кнопки инпута вешаем функцию addTask