import Game from './components/Game'
import Landing from './components/Landing'
import './App.css';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={Game} path='/game/:id' />
        <Route component={Landing} path="/" />
      </Switch>
    </div>
  );
}

export default App;
