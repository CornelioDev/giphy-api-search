import type { Gif } from "../interfaces/gif.interface";

interface Props {
    data: Gif[];
}

export const GiftsList = ({ data,  }: Props) => {
    return (
        <div className="gifs-container" >
            {
                data.map((gif) => (
                    <div key={gif.id} className="gif-card">
                        <img src={gif.url} alt={gif.title} />
                        <h3>{gif.title}</h3>
                        <p>
                            {gif.width}x{gif.height} (1.5mb)
                        </p>
                    </div>
                ))
            }
        </div>
    )
}