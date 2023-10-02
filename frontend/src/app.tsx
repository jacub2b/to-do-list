import { Divider } from 'antd';
import ToDoList from './components/ToDoList'
import './style/app.css'

const app = () => {
  return <div className='app'>
    <Divider orientation="left">My to-do list</Divider>
    <ToDoList></ToDoList>
  </div>
}

export default app