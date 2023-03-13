import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import s from './App.module.css'

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {
    const {tasks, removeTask, changeTaskStatus} = props


    const tasksItems: JSX.Element[] | JSX.Element = tasks.length
        ? tasks.map((task) => {
            const taskClasses = [s.task]
            task.isDone && taskClasses.push(s.taskDone)
            const removeTaskOnClickHandler = () => removeTask(task.id)
            const changeTaskStatusOnClickHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li key={task.id}>
                    <input type={'checkbox'} checked={task.isDone} onChange={changeTaskStatusOnClickHandler}/>
                    <button onClick={removeTaskOnClickHandler}>x</button>
                    <span className={taskClasses.join(' ')}>{task.title}</span>
                </li>
            )
        })
        : <span>Task list is empty</span>

    return (
        <ul>{tasksItems}</ul>
    )
};