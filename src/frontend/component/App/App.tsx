import React, {useState, useEffect} from 'react';
import './App.scss';

export const App = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    fetch('api/hello').then(res => res.json()).then(data => setText(data.text));
  }, [])

  return (
    <div>
      <h1>{text}</h1>
      <div className="container">
        <div className="row">some 1</div>
        <div className="row">some 2</div>
      </div>
    </div>
  )
}