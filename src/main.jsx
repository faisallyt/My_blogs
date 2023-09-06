
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppContextProvider from './context/AppContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppContextProvider>
      <App />
  </AppContextProvider>
  </Router>
);

