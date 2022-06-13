import { getEndpoint } from "../../src/services/api";

describe('Test getEndpoint', () => {
  it('Should return an API url', () => {
    let route = "/posts";
    expect(getEndpoint('/posts'))
    .toBeDefined();
    expect(getEndpoint('/posts'))
    .toEqual(`${process.env.API_BASE_URL}${route}`);
  });
});