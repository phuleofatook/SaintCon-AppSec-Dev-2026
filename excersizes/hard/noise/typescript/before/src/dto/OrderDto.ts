import { UserDto } from './UserDto';

export interface OrderDto {
  id: number;
  customer: UserDto;
  total: number;
  status: string;
}
