import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsUUID()
  instructorId: string;
}
