import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  status?: TaskStatus;
  title?: string;
  description?: string;
}
