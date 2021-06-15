import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import DetailsPage from './pages/details/DetailsPage';
import PageNotFound from './pages/error/404/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={DashboardPage} exact />
        <Route path='/country/:id' component={DetailsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}
