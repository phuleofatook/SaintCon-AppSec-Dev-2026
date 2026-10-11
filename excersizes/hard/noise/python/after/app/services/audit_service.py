class AuditService:
    def record_user_viewed(self, user_id: str) -> str:
        return f"user:{user_id}:viewed"
