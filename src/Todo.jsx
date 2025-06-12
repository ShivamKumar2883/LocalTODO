import "./Todo.css";
import React, { useState } from 'react';
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";


        export const Todo = () => {
        const [task, setTask] = useState(()=> getLocalStorageTodoData());
       
    
        const handleFormSubmit = (inputValue) => {
        const {id,content,checked}=inputValue;
        //to check if the input field is empty or not
        if (!content) return;
        //to check if the data is already existing or not
        // if (task.includes(inputValue)) return;
        const ifTodoContentMatched =task.find(
            (curTask)=> curTask.content === content);
        if(ifTodoContentMatched) return;
        setTask((prevTask) => [...prevTask, {id,content,checked}]);
        };

        setLocalStorageTodoData(task);

        const handleDeleteTodo =(value)=>{
        const updatedTask = task.filter((curTask) => curTask.content !== value);        
        setTask(updatedTask);
        }

        const handleClearButton =()=>{
        setTask([]); 
        };

    const handleCheckedTodo=(content)=>{
        const updatedTask = task.map((curTask)=>{
            if(curTask.content===content){
                return{
                    ...curTask, checked:!curTask.checked
                }
                }
                else{
                    return curTask; 
                }
        });
        setTask(updatedTask);
    };
    return (
        <section className="todo-container">
            <header className="header">
                <h1>Todo List</h1>
                <TodoDate/>
            </header>
            <TodoForm onAddTodo={handleFormSubmit}/>
            <section className="myUnOrdList">
                <ul className="todo-list">
                    {task.map((curTask) => {
                        return (
                        <TodoList 
                        key={curTask.id} 
                        data={curTask.content}  
                        checked={curTask.checked} 
                        onHandleDeleteTodo = {handleDeleteTodo} 
                        onHandleCheckedTodo = {handleCheckedTodo}
                        />
                    );
                    })}
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearButton}>Clear All</button>
            </section>
           <section className="info">
    <h6>Your tasks will remain intact, even if the page is refreshed.</h6>
    <h6>Feel free to return at your convenience, your data is safely stored. 😊</h6>
</section>

<section className="ending">
    <a href="https://www.linkedin.com/in/shivamkr2002/" target="_blank" rel="noopener noreferrer">
        <h7>Made by Shivam as, React mini project.</h7>
    </a>
</section>

<section className="add-to-home">
    <h6>(Add to your Home screen, for better access.)</h6>
</section>

        </section>
    );
};
