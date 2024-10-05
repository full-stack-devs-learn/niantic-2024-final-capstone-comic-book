

export default function Characters({data, onClick}: any)
{
    return (
        <div className="characters">
            {
                data.map((character: any) => {
                    return (
                        <div key={character.id} className="characterCard " style={{background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center`,
                            backgroundSize: "cover",
                            }}
                            onClick={() => onClick(character.id)}
                            >
                            <div className="caption">{character.name}</div>
                            <div className="caption bottom">View Comics</div>
                        </div>
                    )
                })
            }
        </div>
    )
    
}