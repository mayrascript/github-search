import { UserInfo } from './user-info.model';

export interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: UserInfo[];
}
