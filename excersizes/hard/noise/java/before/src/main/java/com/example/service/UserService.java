package com.example.service;

import com.example.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserDto update(long id, UserDto user) {
        user.setId(id);
        return user;
    }

    public UserDto get(long id) {
        UserDto dto = new UserDto();
        dto.setId(id);
        dto.setDisplayName("Example User");
        dto.setEmail("user@example.com");
        dto.setRole("user");
        return dto;
    }
}
