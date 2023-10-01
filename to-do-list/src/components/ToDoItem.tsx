import { Input, List } from "antd";
import ToDoButton from "./ToDoButton";
import { useState } from "react";
import { Task } from "../types/Task";

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
    //update db
    setIsCompleted(!isCompleted);
  };

  const handleDeletion = () => {
    onDelete(children);
  };

  const handleTextChange = (newText: string) => {
    setEditedText(newText);
  }

  const handleFinishEditing = async () => {
    setIsBeingEdited(false);
    //update db
    setText(editedText);
  }

  return (
    <>
      <List.Item onDoubleClick={handleStartEditing}>
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
