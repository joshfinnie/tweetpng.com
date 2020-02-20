/* eslint @typescript-eslint/camelcase: ["error", {ignoreDestructuring: true}] */
import {performance} from 'perf_hooks';

import {Server, Request, ResponseToolkit} from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as Handlebars from 'handlebars';

import {
  getDateOfTweet,
  getImageData,
  getLastTweetId,
  getUsefulHtml,
  takeImage,
  unfurlUrl,
} from './lib/helpers';

const server: Server = new Server({
  port: 3000,
  host: 'localhost',
  debug: {request: ['error']},
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request: Request, h: ResponseToolkit) => {
    return h.view('home', {});
  },
});

server.route({
  method: 'GET',
  path: '/{user}/tweet/last',
  handler: (request: Request, h: ResponseToolkit) => {
    const {user} = request.params;
    const {token} = request.query;

    //if (token !== process.env.INTERNAL_API_KEY) {
    //  return h.response({error: 'Unauthorized', status: 401}).code(401);
    //}

    return h.view('last', {
      user,
    });
  },
});

server.route({
  method: 'GET',
  path: '/{user}/tweet/last.png',
  handler: async (request: Request, h: ResponseToolkit) => {
    const {user} = request.params;
    const t1 = performance.now();
    const tweetId = await getLastTweetId(server.info.uri, user);
    const t2 = performance.now();
    console.log(`Call to getLastTweetId took ${t2 - t1} milliseconds.`);
    const buf = await takeImage(server.info.uri, user, tweetId);
    return h
      .response(buf)
      .type('image/png')
      .bytes(buf.length)
      .code(200);
  },
  options: {
    cache: {
      expiresIn: 60 * 1000, // 1 minute cache
      privacy: 'default',
    },
  },
});

server.route({
  method: 'GET',
  path: '/{user}/tweet/{tweetId}',
  handler: async (request: Request, h: ResponseToolkit) => {
    const {tweetId, user} = request.params;
    const {token} = request.query;
    const t1 = performance.now();
    const resp = await getImageData(user, tweetId);
    const t2 = performance.now();
    console.log(`Call to getImageData took ${t2 - t1} milliseconds.`);
    const {html, author_name: authorName, author_url: authorUrl} = resp.data;

    const usefulHtml = await unfurlUrl(getUsefulHtml(html));
    const date = getDateOfTweet(html);

    if (token !== process.env.INTERNAL_API_KEY) {
      return h.response({error: 'Unauthorized', status: 401}).code(401);
    }

    return h.view('index', {
      photo: `https://avatars.io/twitter/${user}`,
      user: authorName,
      handle: `${authorUrl.split('/')[3]}`,
      date,
      message: usefulHtml,
    });
  },
});

server.route({
  method: 'GET',
  path: '/{user}/tweet/{tweetId}.png',
  handler: async (request: Request, h: ResponseToolkit) => {
    const {tweetId, user} = request.params;
    const buf = await takeImage(server.info.uri, user, tweetId);
    return h
      .response(buf)
      .type('image/png')
      .bytes(buf.length)
      .code(200);
  },
  options: {
    cache: {
      expiresIn: 31556952 * 1000, // 1 year cache
      privacy: 'default',
    },
  },
});

const init = async (): Promise<Server> => {
  await server.initialize();

  await server.register(Inert);

  await server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: './src/public',
      },
    },
  });

  await server.register(Vision);

  await server.views({
    engines: {
      html: Handlebars,
    },
    relativeTo: 'src',
    path: 'templates',
  });

  return server;
};

const start = async (): Promise<Server> => {
  await init();
  await server.start();
  console.log(`Server running at: ${server.info.uri}.`);
  return server;
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

export {init, server, start};
