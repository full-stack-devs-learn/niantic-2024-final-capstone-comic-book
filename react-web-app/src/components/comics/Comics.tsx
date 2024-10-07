import './Comics.css';

export default function Comics({ data }: any)
{
    return (
        <div className="comics">
            {data.map((comic: any) => {
                const detailsUrl = comic.urls.find(
                    (element: any) => element["type"] === "detail"
                ).url

                return (
                    <a
                        key={comic.id}
                        className="comicCard"
                        style={{
                            background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
                            backgroundSize: "cover",
                        }}
                        href={detailsUrl}
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