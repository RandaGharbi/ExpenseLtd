import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Layout from './shared/Layout'
import ListPage from './pages/ListPage';
import ExpensePage from './pages/ExpensePage';
import StatisticPage from './pages/StatisticPage';

const App = () => (
  <Router>
    <Layout>
        <Route exact path={ROUTES.LIST} component={ListPage} />
        <Route exact path={ROUTES.EXPENSE} component={ExpensePage} />
        <Route exact path={ROUTES.STATISTIC} component={StatisticPage} />
    </Layout>
  </Router>
);

export default App;
