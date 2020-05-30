import { UserInfoDto } from 'src/app/core/dtos/user-info.dto';

export interface SearchResultDto {
  total_count: number;
  incomplete_results: boolean;
  items: UserInfoDto[];
}
