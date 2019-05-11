import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'Components/not-found/NotFound';
import Home from '../features/home';
import Feed from '../features/feed';
import ViewABucketList from '../features/feed/ViewABucketList';
import CreateItem from '../features/feed/CreateItem';
import CreateABucketList from '../features/feed/CreateABucketList';
import Authorization from '../features/authentication/Authorization';

const Main = () => (
  <main className="bg-light">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/list/:id" component={ViewABucketList} />
      <Route exact path="/bucketList/create" component={CreateABucketList} />
      <Route exact path="/item/create" component={CreateItem} />
      <Route exact path="/auth" component={Authorization} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
