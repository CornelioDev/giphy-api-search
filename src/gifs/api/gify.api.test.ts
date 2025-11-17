import { describe, expect, test } from "vitest";
import { gihyApi } from "./giphy.api";

describe('giphyAPi', () => {
    test('should be configured correctly', () => {
        expect(gihyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(gihyApi.defaults.params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
        })
    })
})