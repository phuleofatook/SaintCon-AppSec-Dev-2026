#ifndef PAGINATION_H
#define PAGINATION_H

typedef struct {
    unsigned long page;
    unsigned int page_size;
    unsigned long total;
} Pagination;

#endif
