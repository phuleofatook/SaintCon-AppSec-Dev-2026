from flask import Blueprint, jsonify, request
from app.dto.user import UserDto
from app.services.user_service import UserService

users = Blueprint("users", __name__)
service = UserService()

@users.put("/users/<user_id>")
def update(user_id: str):
    body = request.get_json()
    user = UserDto(**body)
    return jsonify(service.update(user_id, user))

@users.get("/users/<user_id>")
def get(user_id: str):
    return jsonify(service.get(user_id))
