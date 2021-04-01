import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Post from './components/Post';

function App() {
  return (
    <>        
      <BrowserRouter>            
        <Switch>
          <Route path="/" component={Post} exact/>
        </Switch>  
      </BrowserRouter>
    </>
  )
    
 }

export default App;
