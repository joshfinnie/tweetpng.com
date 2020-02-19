import axios, {AxiosResponse} from 'axios';
import * as puppeteer from 'puppeteer';

export const getImageData = async (
  username: string,
  tweetId: string,
): Promise<AxiosResponse> => {
  const url = `https://publish.twitter.com/oembed?url=https://twitter.com/${username}/status/${tweetId}`;
  return await axios.get(url);
};

export const getUsefulHtml = (html: string): string => {
  let newHtml = html;
  newHtml = newHtml.substring(0, html.length - 86);
  newHtml = newHtml.split('<p')[1].split('</p>')[0];
  return `<p${newHtml}</p>`;
};

export const getDateOfTweet = (html: string): string => {
  let newHtml = html;
  const s = html.split('<a');
  newHtml = s[s.length - 1].split('</a>')[0];
  return `<a${newHtml}</a>`;
};

export const unfurlUrl = async (html: string): Promise<string> => {
  let newHtml = html;
  const tCos = [...new Set(newHtml.match(/\bhttps?:\/\/t.co\/[a-zA-Z0-9]+/gi))];
  for (const tCo of tCos) {
    const resp = await axios.get(tCo);
    const responseUrl = await resp.request.res.responseUrl;
    const re = new RegExp(tCo, 'g');
    newHtml = newHtml.replace(re, responseUrl);
  }
  return newHtml;
};

export const getLastTweetId = async (
  server: string,
  username: string,
): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `${server}/${username}/tweet/last?token=${process.env.INTERNAL_API_KEY}`;
  await page.goto(url);
  await page.waitForSelector('#tweetPNG-tweetID', {
    visible: true,
  });
  const elem = await page.$('#tweetPNG-tweetId');
  return await page.evaluate(element => element.innerText, elem);
};

export const takeImage = async (
  server: string,
  username: string,
  tweetId: string,
): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `${server}/${username}/tweet/${tweetId}?token=${process.env.INTERNAL_API_KEY}`;
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });
  const elem = await page.$('.container');
  const bound = await elem.boundingBox();
  const imageStream = await elem.screenshot({
    clip: {x: 0, y: 0, width: bound.width + 15, height: bound.height + 15},
  });

  await browser.close();
  return imageStream;
};
