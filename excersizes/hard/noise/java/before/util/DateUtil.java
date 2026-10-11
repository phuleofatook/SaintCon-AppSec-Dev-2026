package com.example.util;
import java.time.Instant;
public final class DateUtil {
    private DateUtil() {}
    public static String isoDate(Instant value) { return value.toString(); }
}
