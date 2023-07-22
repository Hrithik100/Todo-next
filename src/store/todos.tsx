"use client";

import { createContext, ReactNode, useState, useContext } from "react";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodosCompleted:(id:string) => void;
  handleTodoDelete:(id:string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export function TodosProvider({children}: { children: ReactNode }) {

    // The state variable todos is expected to be an array of Todo objects.
    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
        const newTodos = localStorage.getItem('todos') || "[]";
        return JSON.parse(newTodos) as Todo[]
        }catch (e) {
            return []
        }

    })

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos))
      return newTodos;
    });
  };

//   if the task is completed

const toggleTodosCompleted = (id:string) => {
    setTodos((prev) =>{
        const newTodos = prev.map((task)=>{
            if(task.id === id){
                return {...task, completed: !task.completed}
            }
            return task
        })
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos
    })
}

// if the task is deleted

const handleTodoDelete = (id:string) =>{
    setTodos((prev)=> {
        const newTodos = prev.filter((task)=> task.id !== id)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos
    })
}

  return (
    <todosContext.Provider value={{ todos, handleAddTodo, toggleTodosCompleted,handleTodoDelete }}>
      {children}
    </todosContext.Provider>
  );
};

// context api

export function useTodos() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error();
  }
  return todosContextValue;
}
