import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task';

import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task';
import { GetTasksFilter } from './dto/get-tasks-filter';

import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { isWeakMap } from 'util/types';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  private tasks: Task[] = [];
  async insertTask(title: string, description: string, status: TaskStatus) {
    const newTask = new this.taskModel({
      title,
      description,
      status,
    });
    const result = await newTask.save();
    return result.id;
  }

  getAllTasks() {
    return this.tasks;
  }
  getTaskWithFilters(filterDto: GetTasksFilter): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
  getTaskById(id: string): Task {
    //try to get task if not found
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
    //return this.tasks.find((task) => task.id === id);
  }
  //createTask(title: string, description: string): Task {
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
