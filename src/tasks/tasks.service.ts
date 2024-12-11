import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    return this.tasks.filter((task) => {
      const hasStatus = getTasksFilterDto.status
        ? task.status === getTasksFilterDto.status
        : true;

      const hasSearch = getTasksFilterDto.search
        ? task.title.includes(getTasksFilterDto.search) ||
          task.description.includes(getTasksFilterDto.search)
        : true;

      return hasStatus && hasSearch;
    });
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...createTaskDto,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  removeTaskById(id: string): void {
    const found = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto) {
    let task = this.getTaskById(id);

    task = { ...task, ...updateTaskDto };

    return task;
  }
}
