import { Request, Response } from 'express';
import { UserDto } from '../dto/UserDto';
import { UserService } from '../service/UserService';

export class UserController {
  constructor(private readonly users: UserService) {}

  async update(req: Request, res: Response): Promise<void> {
    const user: UserDto = req.body;
    const updated = await this.users.update(req.params.id, user);
    res.json(updated);
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.users.get(req.params.id));
  }
}
