import './Search.css'
import { useState } from 'react';
import Characters from '../characters/Characters';
import Comics from '../comics/Comics';
import md5 from "md5";
import Details from '../details/Details';

export default function Search() {
    const [characterName, setCharacterName] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);
    const [comicDetails, setComicDetails] = useState(null);
    const [comicId, setComicId] = useState(null);
    const [comicSelection, setComicSelection] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const publicKey: string = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey: string = import.meta.env.VITE_PRIVATE_KEY;

    const handleSubmit = (event: any) => {
        event.preventDefault();

        getCharacterData();
    }

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        const timeStamp = new Date().getTime();
        const hash: string = generateHash(timeStamp);
        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`

        fetch(url).then(response => response.json()).then(
            result => {
                setCharacterData(result.data);
            }).catch((error) => {
                console.log("There was an error: ", error)
            });
    }

    const getComicData = (characterId: number) => {
        window.scrollTo({ top: 0, left: 0 });

        const timeStamp = new Date().getTime();
        const hash: string = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`

        fetch(url).then(response => response.json()).then((results) => {
            setComicData(results.data);
        }).catch(error => {
            console.log("Error while fetching comic data", error)
        })
    }

    const getComicSelection = (comicId: number) => {
        window.scrollTo({ top: 0, left: 0 });

        const timeStamp = new Date().getTime();
        const hash: string = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`

        fetch(url).then(response => response.json()).then((results) => {
            setComicSelection(results.data);
            setComicId(results.data.results[0].id);
            setTitle(results.data.results[0].title)
            setDescription(results.data.results[0].description)
            setPhotoUrl(`${results.data.results[0].thumbnail.path}.${results.data.results[0].thumbnail.extension}`)
            console.log(`comics selection id: ${results.data.results[0].id}`)
            console.log(`comics selection: ${comicSelection}`)
            console.log(`title ${title}`)
            console.log(photoUrl)
        }).catch(error => {
            console.log("Error while fetching comic details", error)
        })

    }

    const generateHash = (timeStamp: number) => {
        return md5(timeStamp + privateKey + publicKey);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharacterName(event.target.value);
    }

    const handleReset = () => {
        setCharacterData(null);
        setComicData(null);
        setCharacterName('');
        setComicSelection(null);
    }


    return (
        <div>
            <div className="container discover-container">
                <h5 className="discover">Discover comic books</h5>
            </div>
            <form className="search mb-3" onSubmit={handleSubmit}>
                <div className="input-group search-container">
                    <input className="form-control" type="search"
                        placeholder="Enter Character Name" onChange={handleChange} />
                    <button className="btn btn-info" type="submit">Search</button>
                </div>
                <div className="container reset-container">
                    <button type="reset" className='reset btn btn-danger btn-sm' onClick={handleReset}>Reset</button>
                </div>
            </form>

            {
                !comicData && characterData && characterData['results'][0] && (
                    <Characters data={characterData['results']} onClick={getComicData} />)
            }

            {
                comicData && comicData['results'][0] && !comicSelection && !comicId && <Comics data={comicData['results']} onClick={getComicSelection} />
            }

            {
                comicData && comicSelection && comicSelection['results'][0] && (<Details photoUrl={photoUrl} title={title} description={description} comicId={comicId}></Details>)
            }

        </div>
    )


}