import { Input, List } from "antd";
import ToDoButton from "./ToDoButton";
import { useState } from "react";
import { Task } from "../types/Task";
import { editTask } from "../services/taskService";

interface ToDoItemProps {
  children: Task;
  onDelete: (task: Task) => void;
}

const ToDoItem = ({ children, onDelete }: ToDoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(children.wasCompleted);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedText, setEditedText] = useState(children.text);
  const [text, setText] = useState(children.text);

  const handleStartEditing = () => {
    setIsBeingEdited(true);
  };

  const handleCompletion = async () => {
    const updatedTask = {...children, wasCompleted: true};
    const savedTask = await editTask(updatedTask);
    setIsCompleted(savedTask.wasCompleted);
  };

  const handleDeletion = () => {
    onDelete(children);
  };

  const handleTextChange = (newText: string) => {
    setEditedText(newText);
  }

  const handleFinishEditing = async () => {
    setIsBeingEdited(false);
    const editedTask :Task = {...children, text: editedText};
    const savedTask = await editTask(editedTask);
    setText(savedTask.text);
  }

  return (
    <>
      <List.Item onDoubleClick={handleStartEditing} className="list-item">
        {isBeingEdited ? (
          <Input 
          value={editedText}
          onChange={(e) => handleTextChange(e.target.value)} 
          onPressEnter={handleFinishEditing}/>
        ) : isCompleted ? (
          <del>{text}</del>
        ) : (
          text
        )}
      </List.Item>
      <ToDoButton type="primary" onClick={handleCompletion}>
        complete
      </ToDoButton>
      <ToDoButton type="primary" danger onClick={handleDeletion}>
        x
      </ToDoButton>
    </>
  );
};

export default ToDoItem;
