package com.example.resource;

import com.example.dto.UserDto;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService users;

    public UserController(UserService users) {
        this.users = users;
    }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable long id, @RequestBody UserDto user) {
        return users.update(id, user);
    }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable long id) {
        return users.get(id);
    }
}
