const parseJSON = (payload) => {
  try {
    return JSON.parse(payload);
  } catch {
    return false;
  }
};

module.exports = parseJSON;
