import logo from './logo.svg';
import './App.css';
import KeywordMain from './KeywordMain';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <KeywordMain />
      </header>
    </div>
  );
}

export default App;
