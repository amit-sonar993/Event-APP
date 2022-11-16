import React from 'react'
import ReactDOM from 'react-dom/client'
import Event from './event/Event.jsx'
import  store  from '../store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Event />
    </Provider>
  </React.StrictMode>
)
