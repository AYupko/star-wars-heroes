import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { service } from './service';

const mock = new MockAdapter(axios);
const id = "1";
const BASE_URL = 'https://sw-api.starnavi.io';

describe("Fetching hero data", () => {

  it("should return correct hero data", async () => {
    const responseData = { name: "Luke Skywalker" };
    mock.onGet(BASE_URL + `/people/${id}`).reply(200, responseData);

    const result = await service.getHero(id);

    expect(result.name).toEqual("Luke Skywalker");

    mock.reset();
  });
});

describe("Fetching all heroes data", () => {
  it("should fetch whole data", async () => {
    const responseData = {
      next: "https://sw-api.starnavi.io/people/?page=2",
      results: Array.from({ length: 10 }, (_, index) => ({ name: `Hero ${index + 1}` }))
    };
    mock.onGet(BASE_URL + '/people/').reply(200, responseData);

    const result = await service.getHeroes(BASE_URL +'/people/');

    expect(result.next).toBeTruthy();
    expect(result.results).toHaveLength(10);

    mock.reset();
  });
});

describe("Fetching correct films data", () => {
  it("should return only those films, where character is present", async () => {
    const responseData = { 
      results: Array.from({ length: 4 }, (_, index) => ({ title: `Film ${index + 1}` })) 
    };    mock.onGet(BASE_URL + `/films/?characters__in=${id}`).reply(200, responseData);

    const result = await service.getFilms(id);

    expect(result).toHaveLength(4);

    mock.reset();
  });
});

describe("Fetching correct starships data", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should return empty array if hero doesn't drive any ship in certain chapters", async () => {
    const responseData = {
      results: [],
    };
    const filmIds = '5,6';
    mock.onGet(`${BASE_URL}/starships/?films__in=${filmIds}&pilots__in=${id}`).reply(200, responseData);

    const result = await service.getStarships([5, 6], id);

    expect(result.length).toEqual(0);
  });

  it("should return only those ships, which are used by hero in certain chapters", async () => {
    const responseData = {
      results: Array.from({ length: 2 }, (_, index) => ({ name: `Starship ${index + 1}` })),
    }
    const filmIds = '1,2,3';
    mock.onGet(`${BASE_URL}/starships/?films__in=${filmIds}&pilots__in=${id}`).reply(200, responseData);

    const result = await service.getStarships([1, 2, 3], id);

    expect(result.length).toEqual(2);
  });
});