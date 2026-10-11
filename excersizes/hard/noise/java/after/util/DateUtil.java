package com.example.util;
import java.time.Instant;
/** Utility methods. */
public final class DateUtil {
    private DateUtil() {}
    public static String isoDate(Instant value) { return value.toString(); }
}
