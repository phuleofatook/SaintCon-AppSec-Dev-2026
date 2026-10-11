from app.dto.user import UserDto

class UserService:
    def update(self, user_id: int, user: UserDto):
        user.id = user_id
        return user.__dict__

    def get(self, user_id: int):
        return {
            "id": user_id,
            "display_name": "Example User",
            "email": "user@example.com",
            "role": "user",
        }
