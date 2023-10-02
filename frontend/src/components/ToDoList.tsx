import { List, Input } from "antd";
import ToDoItem from "./ToDoItem";
import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import '../style/to-do-list.css'

const ToDoList = () => {
  const data: Task[] = [
    { id: "1", text: "Go work out", wasCompleted: false },
    { id: "2", text: "Get fat", wasCompleted: false },
    { id: "3", text: "Get skinny", wasCompleted: false },
    { id: "4", text: "eat steak", wasCompleted: false },
    { id: "5", text: "get it done", wasCompleted: false },
  ];

  const [tasksData, setTasksData] = useState<Task[]>(data);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTasksFromDB();
  }, []);

  const fetchTasksFromDB = () => {
    setTasksData(data);
  };

  const handleTaskDeletion = async (deletedTask: Task) => {
    console.log("trying to delete: " + deletedTask.id);
    //todo: delete in db
    const filteredTasks = tasksData.filter(
      (currentTask) => currentTask.id !== deletedTask.id
    );

    console.log(filteredTasks.length);
    setTasksData(filteredTasks);
  };

  const handleTaskAddition = async () => {
    setNewTask("");
    //send to db, and re-render with answer
    const newTaskData: Task = { id: "6", text: newTask, wasCompleted: false };
    const updatedList: Task[] = [...tasksData, newTaskData];
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
