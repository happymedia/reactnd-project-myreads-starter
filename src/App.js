import React from 'react';
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import BookShelfPage from './BookShelfPage';
import './App.css';


class BooksApp extends React.Component {
  render() {          
    return (
      <div className="app">       
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/" component={BookShelfPage} />
      </div>
    )
  }
}

export default BooksApp;
