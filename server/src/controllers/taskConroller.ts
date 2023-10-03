import { Request, Response } from 'express';
import Task, { TaskDocument } from '../models/taskModel';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: TaskDocument[] = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    
    const newTask = new Task({ text });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.id;
    const { text, wasCompleted } = req.body;

    const updatedTask: TaskDocument | null = await Task.findByIdAndUpdate(
      taskId,
      { text, wasCompleted },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.id;

    const deletedTask: TaskDocument | null = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};