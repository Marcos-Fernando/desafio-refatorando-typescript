import { BrowserRouter as Router } from 'react-router-dom';
import { IsRoutes } from './routes';
import GlobalStyle from './styles/global';

export function App() {
  return(
    <>
      <GlobalStyle />
      <Router>
        <IsRoutes />
      </Router>
    </>
  )
}
