import React from 'react';

import './App.css';

function App() {
  return (
    <div className="m-auto w-60 mt-32">
      <h2>Todoリスト with typescript</h2>
      <form onSubmit={() => {}}>
        <input type="text" onChange={() => {}} className="rounded-xl border-2 border-black"/>
        <input type="submit" value="作成" className="border-2 border-black" />
      </form>
    </div>
  );
}

export default App;
