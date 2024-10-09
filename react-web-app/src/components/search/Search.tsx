import './Search.css'
import { useEffect, useState } from 'react';
import Characters from '../characters/Characters';
import Comics from '../comics/Comics';
import md5 from "md5";
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { loadComicsSearchResults } from '../../store/features/comics-search-result-slice';
import { loadCharacterSearchResults } from '../../store/features/character-search-result-slice';
import { useSelector } from 'react-redux';

export default function Search()
{
    const [ characterName, setCharacterName ] = useState("");
    const [ characterData, setCharacterData ] = useState(null);
    const [ comicData, setComicData ] = useState(null);

    const dispatch = useDispatch<AppDispatch>()
    const { comicsSearchResults, loading: comicLoading, error: comicError } = useSelector((state: RootState) => state.comicsSearchResults)
    const { characterSearchResults, loading: characterLoading, error: characterError } = useSelector((state: RootState) => state.characterSearchResults)

    // const publicKey: string = import.meta.env.VITE_PUBLIC_KEY;
    // const privateKey: string = import.meta.env.VITE_PRIVATE_KEY;

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // dispatch(loadCharacterSearchResults(characterName))
        getCharacterData();
    }

    useEffect(() => {
        if(characterSearchResults.length == 0)
        {
            dispatch(loadCharacterSearchResults(characterName))
        }
    }, [dispatch])

    if (characterLoading) return <p>Loading charaacters...</p>
    if (characterError) return <p>Error: {characterError}</p>

    if (comicLoading) return <p>Loading comics...</p>
    if (comicError) return <p>Error: {comicError}</p>

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        dispatch(loadCharacterSearchResults(characterName))
    }

    const getComicData = (characterId: number) => {
        window.scrollTo({ top:0, left: 0});

        dispatch(loadComicsSearchResults(characterId));
    }

    // const generateHash = (timeStamp: number) => {
    //     return md5(timeStamp + privateKey + publicKey);
    // }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setCharacterName(event.target.value);
    }

    const handleReset = () => {
        // setCharacterData(null);
        // setComicData(null);
        setCharacterName(''); 
    }

    return (
        <div>
            <div className="container discover-container">
                <h5 className="discover">Discover comic books</h5>
            </div>
            <form className="search mb-3" onSubmit={handleSubmit}>
                <div className="input-group search-container">
                    <input className="form-control" type="search"
                    placeholder="Enter Character Name" onChange={handleChange}/>
                    <button className="btn btn-info" type="submit">Search</button>
                </div>
                <div className="container reset-container">
                    <button type="reset" className='reset btn btn-danger btn-sm' onClick={handleReset}>Reset</button>
                </div>
            </form>

            {/* {
                !comicsSearchResults && characterSearchResults && characterSearchResults['results'][0] && (
                    <Characters data={characterSearchResults['results']} onClick={getComicData} />)
            }

            {
                comicsSearchResults && comicsSearchResults['results'][0] && <Comics data={comicsSearchResults['results']} />
            } */}

            {
                !comicData && characterData && characterData['results'][0] && (
                    <Characters data={characterData['results']} onClick={getComicData} />)
            }

            {
                comicData && comicData['results'][0] && <Comics data={comicData['results']} />
            }
        </div>
    )


    /*
    WORKING CODE:
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
        <div>
            <div className="container discover-container">
                <h5 className="discover">Discover comic books</h5>
            </div>
            <form className="search mb-3" onSubmit={handleSubmit}>
                <div className="input-group search-container">
                    <input className="form-control" type="search"
                    placeholder="Enter Character Name" onChange={handleChange}/>
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
                comicData && comicData['results'][0] && <Comics data={comicData['results']} />
            }
        </div>
    )

    */
}