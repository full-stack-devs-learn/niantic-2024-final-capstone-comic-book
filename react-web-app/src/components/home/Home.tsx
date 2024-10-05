import { useState } from "react";
import demoService from "../../services/demo-service"

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
            <div className="container">

                <h1>
                    Home
                </h1>

                <button onClick={simpleClickHandler}>Simple Authenticated Demo</button>

                <div>
                    {data}
                </div>

            </div>
        </>
    )
}