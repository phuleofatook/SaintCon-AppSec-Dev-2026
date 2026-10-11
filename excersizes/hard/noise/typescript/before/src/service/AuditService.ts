export class AuditService {
  recordUserViewed(userId: number): string {
    return `user:${userId}:viewed`;
  }
}
