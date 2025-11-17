import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import { gihyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../../tests/mocks/giphy.response.data";

describe('getGifsByQuery', () => {
    let mock = new AxiosMockAdapter(gihyApi);

    beforeEach(() => {
        mock = new AxiosMockAdapter(gihyApi);
    })
    
    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock)
        const gifs = await getGifsByQuery('saitama');
        expect(gifs.length).toBe(10);
    });

    test('should return 0 gifs if the query is empty', async () => {
        mock.restore();
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
    });

    test('should handle error when the API returns an error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            },
        });

        const gifs = await getGifsByQuery('Saitama');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
    })
})