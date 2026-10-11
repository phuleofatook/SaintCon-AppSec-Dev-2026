package com.example.dto;

public class PaginationDto {
    private long page;
    private int pageSize;
    private long total;

    public long getPage() { return page; }
    public void setPage(long page) { this.page = page; }
    public int getPageSize() { return pageSize; }
    public void setPageSize(int pageSize) { this.pageSize = pageSize; }
    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }
}
