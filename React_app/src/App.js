import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import Router from './routes';
Amplify.configure(config)


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router />
      </header>
    </div>
  );
}

export default App;
