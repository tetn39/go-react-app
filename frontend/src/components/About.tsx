import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Text = {
  message: string
}

const About = () => {

  const [text, setText] = useState<Text>({ message: '' });

  useEffect(()=> {
    (
      async () => {
        const data = await axios.get("http://localhost:8080/getHello")
        console.log(data)
        setText(data.data)
      }
    )()
  }, [])
  
  return (
    <div>
      <h1 className="bg-indigo-200 text-center text-green-700">なんもないAbout</h1>
      <p>{text.message}</p>
    </div>
  );
}

export default About;