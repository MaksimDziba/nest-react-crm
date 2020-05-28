import React from 'react';
import ReactDOM from 'react-dom';
import {HelloResponse} from '../common/HelloResponse';

const App = () => {
  const [text, setText] = React.useState('');
  React.useEffect(() => {
    fetch('/api/hello')
      .then<HelloResponse>(res => res.json())
      .then(res => setText(res.text));
  }, [])
  return <h1>{text.toString()}</h1>
}

ReactDOM.render(<App />, document.getElementById('root'));