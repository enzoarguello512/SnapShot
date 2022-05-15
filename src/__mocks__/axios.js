export default {
  get: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        photos: {
          photo: [],
        },
      },
    })
  ),
  post: jest.fn().mockImplementation(() => Promise.reject("")),
  put: jest.fn(),
};
