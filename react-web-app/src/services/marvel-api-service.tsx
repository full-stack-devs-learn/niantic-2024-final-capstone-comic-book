import md5 from "md5";

const publicKey: string = import.meta.env.VITE_PUBLIC_KEY;
const privateKey: string = import.meta.env.VITE_PRIVATE_KEY;

class MarvelApiService
{

    async getCharacterData(characterName: string): Promise<any>
    {
        // setCharacterData(null);
        // setComicData(null);

        const timeStamp= new Date().getTime();
        const hash: string = generateHash(timeStamp);
        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`

        const response = await fetch(url).then(response => response.json()).catch((error) => {console.log("There was an error: ", error)
            });

        // const response = await fetch(url).then(response => response.json()).then(
        //     result => {
        //         setCharacterData(result.data);// put in STORE
        //     }).catch((error) => {console.log("There was an error: ", error)
        //     });
        
        return response;
    }

    async getComicData(characterId: number): Promise<any>
    {
        // window.scrollTo({ top:0, left: 0});

        const timeStamp= new Date().getTime();
        const hash: string = generateHash(timeStamp);
        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`
        
        const response = await fetch(url).then(response => response.json()).catch(error => {
            console.log("Error while fetching comic data", error)
        });

        return response;
    }
}

const generateHash = (timeStamp: number) => {
    return md5(timeStamp + privateKey + publicKey);
}

// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
//     setCharacterName(event.target.value);
// }

// const handleReset = () => {
//     setCharacterData(null);
//     setComicData(null);
//     setCharacterName(''); 
// }

const marvelApiService = new MarvelApiService();
export default marvelApiService;