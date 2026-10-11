import { UserDto } from './UserDto';

export interface OrderDto {
  id: string;
  customer: UserDto;
  total: number;
  status: string;
}
