export default {
  register(credentials) {
    return (fetch('/api/register', {
      method: 'POST',
    }));
  },

  test() {
    return (fetch('/api/test', {
      method: 'GET',
    }));
  },
};
