/**
 * @jest-environment node
 */
import {getDateOfTweet, getUsefulHtml, unfurlUrl} from './../src/lib/helpers';

const HTML =
  '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My goodness is <a href="https://twitter.com/hashtag/TweetPNG?src=hash&amp;ref_src=twsrc%5Etfw">#TweetPNG</a> in bad shape! I should see if I can fix it: <a href="https://t.co/GyZPKO0mMq?amp=1">https://t.co/GyZPKO0mMq?amp=1</a></p>&mdash; Josh Finnie (@joshfinnie) <a href="https://twitter.com/joshfinnie/status/354761173800976384?ref_src=twsrc%5Etfw">July 10, 2013</a></blockquote>' +
  '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';

describe('Heplers', () => {
  it('should getUsefulHtml', () => {
    const expected = '<p lang="en" dir="ltr">My goodness is <a href="https://twitter.com/hashtag/TweetPNG?src=hash&amp;ref_src=twsrc%5Etfw">#TweetPNG</a> in bad shape! I should see if I can fix it: <a href="https://t.co/GyZPKO0mMq?amp=1">https://t.co/GyZPKO0mMq?amp=1</a></p>';
    const result = getUsefulHtml(HTML);
    expect(expected).toBe(result);
  });

  it('should unfurlUrl', async () => {
    const expected = '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My goodness is <a href="https://twitter.com/hashtag/TweetPNG?src=hash&amp;ref_src=twsrc%5Etfw">#TweetPNG</a> in bad shape! I should see if I can fix it: <a href="https://www.google.com/?amp=1">https://www.google.com/?amp=1</a></p>&mdash; Josh Finnie (@joshfinnie) <a href="https://twitter.com/joshfinnie/status/354761173800976384?ref_src=twsrc%5Etfw">July 10, 2013</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    const result = await unfurlUrl(HTML);
    expect(expected).toBe(result);
  })

  it('should getDateOfTweet', () => {
    const expected = '<a href="https://twitter.com/joshfinnie/status/354761173800976384?ref_src=twsrc%5Etfw">July 10, 2013</a>';
    const result = getDateOfTweet(HTML);
    expect(expected).toBe(result);
  });
});
