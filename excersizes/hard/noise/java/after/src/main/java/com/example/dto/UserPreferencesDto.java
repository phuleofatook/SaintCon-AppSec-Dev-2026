package com.example.dto;

public class UserPreferencesDto {
    private String userId;
    private String timezone;
    private boolean digestEnabled;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public boolean isDigestEnabled() { return digestEnabled; }
    public void setDigestEnabled(boolean digestEnabled) { this.digestEnabled = digestEnabled; }
}
