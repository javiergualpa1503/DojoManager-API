import { IsUUID, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CreateMembershipDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  classId: string;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  year: number;

  @IsNumber()
  amount: number;
}
