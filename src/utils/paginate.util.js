function paginate(items, page = 1, limit = 10, filter = {}) {
  const filteredItems = items.filter((item) => {
    return Object.keys(filter).every((key) => {
      return item[key].toLowerCase().includes(filter[key].toLowerCase());
    });
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  const result = filteredItems.slice(startIndex, endIndex);

  return {
    currentPage: page,
    totalPages: totalPages,
    limit: limit,
    totalItems: totalItems,
    items: result,
  };
}

module.exports = paginate;
