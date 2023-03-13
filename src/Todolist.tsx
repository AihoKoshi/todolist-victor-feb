import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
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
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    filterTasks: (filterValue: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistTitle, tasks, removeTask, filterTasks, addTask, changeTaskStatus, filter} = props;

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)


    const addTaskOnClickHandler = () => {
        addTask(title.trim())
        setError(true)
        setTitle('')
    }
    const inputOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !addTaskBtnDisabled && addTaskOnClickHandler()
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    // не нравится, но сука работает
    const titleLengthRestrictionError: number = 10
    const titleLengthRestrictionExceededError: boolean = title.length > titleLengthRestrictionError
    const addTaskBtnDisabled = !title.trim().length || titleLengthRestrictionExceededError
    const titleRequiredError = error && <div className={s.divError}>Title is required</div>
    const titleLengthExceedError = titleLengthRestrictionExceededError && <div className={s.divError}>Title shouldn't exceed 10 characters</div>
    const inputErrorClassAssignment = error || titleLengthExceedError ? s.inputError : ''

    const filterHandlerCreator = (filter: FilterValuesType): () => void => (): void => filterTasks(filter) // шутка от Виктора с типизацией ))) можно еще создать тип type OnClickHandler = () => void и вставить сюда


    return (
        <div className={s.Todolist}>
            <h3>{todolistTitle}</h3>
            <div>
                <input
                    className={inputErrorClassAssignment}
                    value={title}
                    placeholder={'Please type title'}
                    onChange={inputOnChangeHandler}
                    onKeyDown={inputOnKeyDownHandler}
                />
                <button
                    disabled={addTaskBtnDisabled}
                    onClick={addTaskOnClickHandler}
                >+
                </button>
                {titleRequiredError} {titleLengthExceedError}
            </div>
            <TasksList tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
            <div className={s.filterBtnContainer}>
                <button className={filter === 'all' ? s.filterActiveBtn : s.filterBtn}
                        onClick={filterHandlerCreator('all')}
                >All
                </button>
                <button className={filter === 'active' ? s.filterActiveBtn : s.filterBtn}
                        onClick={filterHandlerCreator('active')}
                >Active
                </button>
                <button className={filter === 'completed' ? s.filterActiveBtn : s.filterBtn}
                        onClick={filterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    )
}

// const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
// const addTask = () => {
// addTaskInput.current && addTask(addTaskInput.current.value)
// }
// при этом на input в разметке вешаем ярлык ref={addTaskInput} и на onClick кнопки инпута вешаем функцию addTask

// нравится, но работает не так, как хочется
// const inputError = () => {
//     return !title.length
//         ? <div>Title is required</div>
//         : title.length > 7
//             ? <div>Title shouldn't exceed 7 characters</div>
//             : ''
// }