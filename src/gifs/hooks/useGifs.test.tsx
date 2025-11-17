import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import * as gifsActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousSearchTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handlePreviousTermsClick).toBeDefined();
    });

    // Search 
    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('Saitama');
        });
        expect(result.current.gifs.length).toBe(10);
    })

    // Click
    test('should return a list of gifs when handleTermClick is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handlePreviousTermsClick('Goku');
        })
        expect(result.current.gifs.length).toBe(10)
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handlePreviousTermsClick('Goku');
        });
        expect(result.current.gifs.length).toBe(10);

        // Reject the API call on new gifs
        vi.spyOn(gifsActions, 'getGifsByQuery').mockRejectedValue(new Error('Mocking exception'));

        await act(async () => {
            await result.current.handlePreviousTermsClick('Goku');
        });
        expect(result.current.gifs.length).toBe(10);
    });

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        // Search 10 times
        await act(async () => {
            for (let i = 1; i <= 10; i++) {
                await result.current.handleSearch(`Previous Term - ${i}`);
            }
        })
        // Should offset the first 2 search terms
        const mockSearchTerms = [
            'previous term - 10',
            'previous term - 9',
            'previous term - 8',
            'previous term - 7',
            'previous term - 6',
            'previous term - 5',
            'previous term - 4',
            'previous term - 3'
        ]
        expect(result.current.previousSearchTerms.length).toBe(8);
        expect(result.current.previousSearchTerms).toStrictEqual(mockSearchTerms);
    });

})