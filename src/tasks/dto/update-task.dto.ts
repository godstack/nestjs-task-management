import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  title?: string;
  description?: string;
}
