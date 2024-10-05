import { useDispatch } from 'react-redux'
import './Search.css'
import { AppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { useState } from 'react';
import Characters from '../characters/Characters';
import Comics from '../comics/Comics';
import md5 from "md5";

export default function Search()
{
    const [ characterName, setCharacterName ] = useState("");
    const [ characterData, setCharacterData ] = useState(null);
    const [ comicData, setComicData ] = useState(null);

    const publicKey: string = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey: string = import.meta.env.VITE_PRIVATE_KEY;

    const handleSubmit = (event: any) => {
        event.preventDefault();

        getCharacterData();
    }

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        const timeStamp= new Date().getTime();
        const hash: string = generateHash(timeStamp);
        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`
    
        fetch(url).then(response => response.json()).then(
            result => {
                setCharacterData(result.data);
            }).catch((error) => {console.log("There was an error: ", error)
            });
    }

    const getComicData = (characterId: number) => {
        window.scrollTo({ top:0, left: 0});

        const timeStamp= new Date().getTime();
        const hash: string = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`
    
        fetch(url).then(response => response.json()).then((results) => {
            setComicData(results.data);
        }).catch(error => {
            console.log("Error while fetching comic data", error)
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
    }


    return (
        <>
            <form className=" search mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                <input className="form-control" type="search"
                placeholder="Enter Character Name" onChange={handleChange}/>
                <button className="btn btn-secondary" type="submit">Search</button>
                </div>
                <div className="container">

                <button type="reset" className='reset' onClick={handleReset}>Reset</button>
                </div>
            </form>

            {
                !comicData && characterData && characterData['results'][0] && (
                    <Characters data={characterData['results']} onClick={getComicData} />)
            }

            {
                comicData && comicData['results'][0] && <Comics data={comicData['results']} />
            }

            {
                comicData && comicData['results'][0] && (
                    <Comics data={comicData['results']}/>
                )
            }
        </>
    )
}