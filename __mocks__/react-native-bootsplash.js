export default {
  hide: jest.fn(),
  show: jest.fn(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
};
