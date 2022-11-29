//import { TaskStatus } from 'aws-sdk/clients/datapipeline';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../task';
export class GetTasksFilter {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
