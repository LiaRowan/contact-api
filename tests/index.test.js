import hello from '../src/index';

describe('Package', () => {
  it('Jest configured successfully', () => {
    expect(hello()).toBe('hello, world');
  });
});
