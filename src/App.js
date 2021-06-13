import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Details from './pages/details/Details';
import PageNotFound from './pages/error/404/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Dashboard} exact />
        <Route path='/country/:id' component={Details} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
