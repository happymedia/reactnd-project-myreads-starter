import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
import BookList from './BookList';
import * as BooksAPI from './util/BooksAPI';
import './App.css';

class Bookshelf extends React.Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf:PropTypes.func.isRequired
  }

  render() {
    const {shelf, books, changeShelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <BookList changeShelf={changeShelf} books={books} />   
        </div>
      </div>
    )
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allData:[],
    currently:[],
    read:[],
    want:[],
    searchResult:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((data) => {
      this.setState({allData:data});
    });
  }
  
  changeShelf = (event, book) => {
    if(event.target.value !== "none") {
      let books = this.state.allData;
      for(let i = 0; i < books.length; i++) {
        if(books[i]["id"] === book.id) {
          books[i]["shelf"] = event.target.value;
          break;
        }
      }
      this.setState({allData:books});
    }
  }

  add = (event, book) => {
    if(event.target.value !== "none") {
      BooksAPI.update(book, event.target.value).then((data) => {
         let books = this.state.allData;
         books.push(book);
         this.setState({showSearchPage:false, allData:books});
      });      
    }
  }

  searchBook = (event) => {
    //console.log(event.target.value)
    if(event.target.value){
      BooksAPI.search(event.target.value).then((data) => {        
        if(!data.error) {
          //console.log(data)
          this.setState({searchResult:data});
        }       
      });
    }else{
       this.setState({searchResult:[]});
    }    
  }

  render() {    
    let [currently, read, want] = [];

    currently = this.state.allData.filter((item) => item.shelf === "currentlyReading");
    read = this.state.allData.filter((item) => item.shelf === "read");
    want = this.state.allData.filter((item) => item.shelf === "wantToRead");
          
    return (
      <div className="app">
       
          <Route exact path="/search" render={()=>(
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" onKeyUp={(event) => this.searchBook(event)}/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <BookList changeShelf={this.add} books={this.state.searchResult} />  
                </ol>
              </div>
            </div>
          )}/>
          <Route exact path="/" render={()=>(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelf="Currently Reading" books={currently} changeShelf={this.changeShelf} />
                <Bookshelf shelf="Want to Read" books={want} changeShelf={this.changeShelf} />
                <Bookshelf shelf="Read" books={read} changeShelf={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to={{
                pathname: '/search',
                hash: '#the-hash',
                state: { showSearchPage: true }
              }}>
                Add a book
              </Link>
              {/*<a onClick={() => this.setState({showSearchPage: true })}>Add a book</a>*/}
            </div>
          </div>
          )} />
      </div>
    )
  }
}

export default BooksApp;
