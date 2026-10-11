package com.example.repository;

public class UserRepository {
    public Object findById(long id) {
        return id;
    }

    public void save(Object user) {
        // persistence omitted
    }
}
