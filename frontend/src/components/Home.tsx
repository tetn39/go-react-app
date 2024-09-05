import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Text = {
  message: string
}

const Home = () => {

  const [text, setText] = useState<Text>({ message: '' });

  useEffect(()=> {
    (
      async () => {
        const data = await axios.get("http://localhost:8080/getTest")
        console.log(data)
        setText(data.data)
      }
    )()
  }, [])


  return (
    <div className='m-auto w-32 bg-blue-500 pt-12 text-white'>
      <h1>Home</h1>
      <p>{text.message}</p>
    </div>
  );
}

export default Home;