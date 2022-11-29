import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/tasks/task';
import { CreateTaskDto } from './dto/create-task';
//import { TaskStatus } from './task.module';
import { GetTasksFilter } from './dto/get-tasks-filter';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
@Controller('tasks')
export class TasksController {
  //     tasksService:TasksService
  constructor(private tasksService: TasksService) {
    //     this.tasksService=tasksService;
  }
  @Get()
  getTasks(@Query() filterDto: GetTasksFilter): Task[] {
    //return this.tasksService.getAllTasks();
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    //@Body('status') status: TaskStatus,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
