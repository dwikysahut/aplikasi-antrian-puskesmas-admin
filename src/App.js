// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,

} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      {/* <img src={Wave} alt="Kiwi standing on oval" className="background-wave" /> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
