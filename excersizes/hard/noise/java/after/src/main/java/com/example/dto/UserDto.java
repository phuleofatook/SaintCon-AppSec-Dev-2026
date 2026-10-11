package com.example.dto;

public class UserDto {
    private String id;
    private String name;
    private String email;
    private String role;

    public long getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return displayName; }
    public void setName(String displayName) { this.displayName = displayName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
