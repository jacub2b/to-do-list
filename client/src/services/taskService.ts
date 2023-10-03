import axios, { AxiosResponse } from 'axios';
import { Task } from '../types/Task';
import { NewTask } from '../types/NewTask';

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    throw error;
  }
};

export const addTask = async (newTask: NewTask): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.post<Task>(API_URL, newTask);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const editTask = async (updatedTask: Task): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.put<Task>(`${API_URL}/${updatedTask.id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error editing task with ID ${updatedTask.id}:`, error);
    throw error;
  }
};
