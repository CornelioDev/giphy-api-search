import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('SearchBar', () => {
    
    test('should render searchbar correctly', () => {
        const { container } = render(<SearchBar onQuery={ ()=>{} }/>);
        
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    test('should call onQuery with the correct value after 700ms', async () => {
        // Render component with the callback
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />)
        // "write" on the input field
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test'}}); 
        // wait for the effect 
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test')
        })
    });
})