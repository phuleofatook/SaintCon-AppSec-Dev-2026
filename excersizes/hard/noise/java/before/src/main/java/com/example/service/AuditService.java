package com.example.service;

public class AuditService {
    public String recordUserViewed(long userId) {
        return "user:" + userId + ":viewed";
    }
}
