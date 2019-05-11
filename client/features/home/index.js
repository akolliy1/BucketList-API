import React, { Fragment } from 'react';
import PrimaryNavbar from 'Components/navbar';
import IntroSection from './components/IntroSection';
import SuggestionArea from './components/SuggestionArea';
import ExploreArea from './components/ExploreArea';

const Homepage = props => (
  <Fragment>
    <PrimaryNavbar />
    <IntroSection {...props} />
    <SuggestionArea />
    <ExploreArea />
  </Fragment>
);

export default Homepage;
