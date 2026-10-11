from app.dto.user import UserDto

class UserService:
    def update(self, user_id: str, user: UserDto):
        user.id = user_id
        return user.__dict__

    def get(self, user_id: str):
        return {
            "id": user_id,
            "name": "Example User",
            "email": "user@example.com",
            "role": "user",
        }
