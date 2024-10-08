import './Comics.css';

export default function Comics({ data, onClick }: any)
{
    return (
        <div className="comics">
            {
                data.map((comic: any) => {
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
                        // if user is logged out, display marvel detailsUrl
                        // if user is logged in display comic details page
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