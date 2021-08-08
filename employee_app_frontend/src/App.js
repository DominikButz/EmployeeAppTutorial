import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Employee from './Pages/Employee';
import Department from './Pages/Department';
import Home from './Pages/Home';
import Navigation from './Components/Navigation';
import Alerts from './Components/Alerts';
//import './App.css';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <BrowserRouter>
            <div className="container">
              <h3 className='m-3 d-flex justify-content-center'>Employee App</h3>
              <Navigation/>
              <Alerts/>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/department' exact component={Department}/>
                <Route path='/employee' exact component={Employee}/>
              </Switch>
          </div>
        </BrowserRouter>
      </AlertProvider>
    </Provider>
  );
}

export default App;
