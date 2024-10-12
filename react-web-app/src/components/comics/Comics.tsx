import './Comics.css';


export default function Comics({ data, onClick }: any) {

    return (
        <div className="comics">
            {
                data.map((comic: any) => {

                    return (
                        <a
                            key={comic.id}
                            className="comicCard"
                            style={{
                                background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
                                backgroundSize: "cover",
                            }}
                            id={comic.id}
                            onClick={() => onClick(comic.id)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="caption">{comic.title}</div>
                            <div className="caption bottom">View Comic Details</div>
                        </a>
                    )
                })}
        </div>
    )
}