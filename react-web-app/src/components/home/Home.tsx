import { useState } from "react";
import demoService from "../../services/demo-service"
import './Home.css'
import { Link } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState<any>('');

  async function simpleClickHandler() {
    const result = await demoService.getDemo()
    console.log(result);
    setData(result)
  }

  return (
    <>
      <div className="home-container">
        <div className="img-container">
          <h1 className="title">Level Up Your Comic Stash</h1>
          <img className="spidey" src="/spidey.png" />
        </div>
        <div className="subtitle">
          <p>The only place where hoarding is a superpower!</p>
        </div>
        <div className="create-btn">
          <Link to="/register" className="btn btn-info btn-lg">Create New Account</Link>
          {/* <button type="button" className="btn btn-info btn-lg" onClick={simpleClickHandler}>Create new account</button> */}
        </div>
        <div>
          {data}
        </div>
      </div>
    </>
  )
}