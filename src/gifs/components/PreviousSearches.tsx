interface Props {
    terms: string[];
    onTermClicked: (term:string) => void;
}
export const PreviousSearches = ({ terms, onTermClicked }: Props) => {
    return (
        <div className="previous-searches">
            <h2>Búsquedas previas</h2>
            <ul className="previous-searches-list">
                {
                    terms.map((term) => (
                        <li key={term} onClick={ () => onTermClicked(term) }>{ term }</li>
                    ))
                }
            </ul>
        </div>
    )
}