import React from "react";
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}

export const TasksList: React.FC<TasksListPropsType> = (props) => {
    const {tasks, removeTask} = props



    const tasksItems: JSX.Element[] | JSX.Element = tasks.length
        ? tasks.map((task) => {
            const removeMappedTask = () => removeTask(task.id)
            return (
                <li key={task.id}>
                    <input type={'checkbox'} checked={task.isDone}/>
                    <button onClick={removeMappedTask}>x</button>
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>Task list is empty</span>

    return (
        <ul>{tasksItems}</ul>
    )
};