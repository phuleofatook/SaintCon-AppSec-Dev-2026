from flask import Blueprint, jsonify, request
from app.dto.user import UserDto
from app.services.user_service import UserService

users = Blueprint("users", __name__)
service = UserService()

@users.put("/users/<int:user_id>")
def update(user_id: int):
    body = request.get_json()
    user = UserDto(**body)
    return jsonify(service.update(user_id, user))

@users.get("/users/<int:user_id>")
def get(user_id: int):
    return jsonify(service.get(user_id))
