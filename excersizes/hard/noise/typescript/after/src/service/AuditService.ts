export class AuditService {
  recordUserViewed(userId: string): string {
    return `user:${userId}:viewed`;
  }
}
