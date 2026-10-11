import { UserDto } from '../dto/UserDto';

export class UserService {
  async update(id: number, user: UserDto): Promise<UserDto> {
    return { ...user, id };
  }

  async get(id: number): Promise<UserDto> {
    return { id, displayName: 'Example User', email: 'user@example.com', role: 'user' };
  }
}
