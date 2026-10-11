class AuditService:
    def record_user_viewed(self, user_id: int) -> str:
        return f"user:{user_id}:viewed"
