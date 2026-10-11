package com.example.service;

public class AuditService {
    public String recordUserViewed(String userId) {
        return "user:" + userId + ":viewed";
    }
}
