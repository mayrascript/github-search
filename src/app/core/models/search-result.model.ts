import { User } from 'src/app/core/models/user.model';

export interface SearchResult {
  totalCount: number;
  users: User[];
}
