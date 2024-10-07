import { useState } from "react";
import demoService from "../../services/demo-service"
import './Home.css'

export default function Home()
{
    const [data, setData] = useState<any>('');

    async function simpleClickHandler()
    {
        const result = await demoService.getDemo()
        console.log(result);
        setData(result)
        
    }

    return (
        <>
            <div className="home-container">
                <div className="img-container">
                    <h1 className="title">Level Up Your Comic Stash</h1>
                    <img className="spidey" src="/public/spidey.png"/>
                </div>
                {/* <div className="title">
                </div> */}
                <div className="subtitle">
                    <p>The only place where hoarding is a superpower!</p>
                </div>
                <div className="create-btn">
                    <button type="button" className="btn btn-info btn-lg" onClick={simpleClickHandler}>Create new account</button>
                </div>
                <div>
                    {data}
                </div>

            </div>
        </>
    )
}