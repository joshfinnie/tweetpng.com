import {ServerInjectOptions} from '@hapi/hapi';

import {init} from '../src/server';

describe('Test Serever Enpoints', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should return 200 for /', async () => {
    const request: ServerInjectOptions = {
      url: '/',
      method: 'GET',
      app: {},
    };
    // Wait for the server to be loaded
    const response = await server.inject(request);

    expect(response.statusCode).toBe(200);
  });

  it('should return 401 for unauthorized /:userid/tweet/:tweetid', async () => {
    const request: ServerInjectOptions = {
      url: '/joshfinnie/tweet/539172552300843008',
      method: 'GET',
      app: {},
    };
    // Wait for the server to be loaded
    const response = await server.inject(request);

    expect(response.statusCode).toBe(401);
  });
});
