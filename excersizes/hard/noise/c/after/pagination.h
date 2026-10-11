#ifndef PAGINATION_H
#define PAGINATION_H

typedef struct {
    unsigned long offset;
    unsigned int limit;
    unsigned long total;
} Pagination;

#endif
