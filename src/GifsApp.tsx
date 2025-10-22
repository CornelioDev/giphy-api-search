import { GiftsList } from "./gifs/components/GiftsList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/componets/CustomHeader"
import { SearchBar } from "./shared/componets/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const {
        gifs,
        previousSearchTerms,
        handlePreviousTermsClick,
        handleSearch
    } = useGifs()

    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el Gif perfecto" />

            {/* Search */}
            <SearchBar
                onQuery={handleSearch}
                placeholder="Busca lo que quieras"
                button="Buscar" />

            {/* Previous Searches*/}
            <PreviousSearches
                terms={previousSearchTerms}
                onTermClicked={handlePreviousTermsClick} />

            {/* Gifs */}
            <GiftsList data={gifs} />
        </>
    )
}
