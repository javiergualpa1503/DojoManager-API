import { IsEnum } from 'class-validator';

import { MembershipStatus } from '../../common/enums/membership-status.enum';

export class UpdateMembershipDto {
  @IsEnum(MembershipStatus)
  status: MembershipStatus;
}
