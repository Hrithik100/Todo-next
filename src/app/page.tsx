import AddTodo from '@/components/AddTodo'
import Navbar from '@/components/Navbar'
import Todos from '@/components/Todos'
import React from 'react'
import './globals.css'
import {RiTodoLine} from "react-icons/ri"

const page = () => {
  return (
    <main>
      <h2><RiTodoLine className="icons"/> TODO NEXT + TYPESCRIPT <RiTodoLine className="icons"/></h2>
      <Navbar/>
      <AddTodo />
      <Todos />
    </main>
  )
}

export default page
