package com.example.dto;

public class UserDto {
    private long id;
    private String displayName;
    private String email;
    private String role;

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
