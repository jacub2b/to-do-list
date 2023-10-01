import { Divider } from 'antd';
import ToDoList from './components/ToDoList'

const app = () => {
  return <>
    <Divider orientation="left">My to-do list</Divider>
    <ToDoList></ToDoList>
  </>
}

export default app