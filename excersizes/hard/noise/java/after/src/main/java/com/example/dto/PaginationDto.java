package com.example.dto;

public class PaginationDto {
    private long offset;
    private int limit;
    private long total;

    public long getOffset() { return offset; }
    public void setOffset(long offset) { this.offset = offset; }
    public int getLimit() { return limit; }
    public void setLimit(int limit) { this.limit = limit; }
    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }
}
