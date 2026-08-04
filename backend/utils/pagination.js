const getPagination = (
    page = 1,
    limit = 10
) => {

    page = Math.max(1, Number(page));

    limit = Math.max(1, Number(limit));

    return {
        page,
        limit,
        skip: (page - 1) * limit,
    };
};

module.exports = getPagination;