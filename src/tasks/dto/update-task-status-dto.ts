//import { TaskStatus } from 'aws-sdk/clients/polly';
import { TaskStatus } from '../task';
import { IsEnum } from 'class-validator';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
