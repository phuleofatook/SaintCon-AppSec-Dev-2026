import { UserDto } from '../dto/UserDto';

export class UserService {
  async update(id: string, user: UserDto): Promise<UserDto> {
    return { ...user, id };
  }

  async get(id: string): Promise<UserDto> {
    return { id, name: 'Example User', email: 'user@example.com', role: 'user' };
  }
}
