import { Button } from "antd";

interface Props {
  type: 'primary';
  danger?: boolean;
  children: string;
  onClick: () => void;
}

const ToDoButton = ({ type, danger, children, onClick}: Props) => {
  return (
    <div>
      <Button type={type} {...(danger && { danger: true })} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default ToDoButton;
