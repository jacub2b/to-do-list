import { List, Input } from "antd";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import "../style/to-do-list.css";
import { fetchTasks, deleteTask, addTask } from "../services/taskService";
import { NewTask } from "../types/NewTask";

const ToDoList = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTasksFromDB();
  }, []);

  const fetchTasksFromDB = async () => {
    try {
      const tasks: Task[] = await fetchTasks();
      setTasksData(tasks);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTaskDeletion = async (deletedTask: Task) => {
    await deleteTask(deletedTask.id);

    const filteredTasks = tasksData.filter(
      (currentTask) => currentTask.id !== deletedTask.id
    );

    setTasksData(filteredTasks);
  };

  const handleTaskAddition = async () => {
    setNewTask("");
    const newTaskData: NewTask = { text: newTask };

    const createdTaskData: Task = await addTask(newTaskData);

    const updatedList: Task[] = [...tasksData, createdTaskData];
    setTasksData(updatedList);
  };

  return (
    <>
      <List
        className="to-do-list"
        size="small"
        header={<h1>{"Pending tasks (" + tasksData.length + ")"} </h1>}
        footer={
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(element) => setNewTask(element.target.value)}
            onPressEnter={handleTaskAddition}
          />
        }
        bordered
        dataSource={tasksData}
        renderItem={(item) => (
          <ToDoItem onDelete={handleTaskDeletion}>{item}</ToDoItem>
        )}
      />
    </>
  );
};

export default ToDoList;
