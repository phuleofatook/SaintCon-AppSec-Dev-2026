export class UserRepository {
  async findById(id: string): Promise<Record<string, unknown>> {
    return { id, name: 'Example User' };
  }

  async save(user: Record<string, unknown>): Promise<void> {
    void user;
  }
}
