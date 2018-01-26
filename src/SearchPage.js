import React from 'react';
import {Link} from 'react-router-dom';
import BookList from './BookList';
import * as BooksAPI from './util/BooksAPI';



class SearchPage extends React.Component {
	constructor(props){
    super(props);
		this.state = {
	    allData:[],
	    searchResult:[]
		}
	}

  componentDidMount(){
    BooksAPI.getAll().then((data) => {
      this.setState({ allData:data});
    });
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

  classedBooks = (searchResult) => {
      let all = this.state.allData;
      return searchResult.map((searchBook) => {
        var tmp = all.find(value=>{return value.id === searchBook.id});

        if(tmp){
          searchBook.shelf = tmp.shelf;
        }

        return searchBook;
      });
  }

	searchBook = (event) => {
		if(event.target.value){
		  BooksAPI.search(event.target.value).then((data) => {        
		    if(!data.error) {
		      this.setState({searchResult:this.classedBooks(data)});
		    }       
		  });
		}else{
		   this.setState({searchResult:[]});
		}    
	}

  render() {          
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={{
            pathname: '/',
            hash: '#the-home'
          }}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyUp={(event) => this.searchBook(event)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList changeShelf={this.add} books={this.state.searchResult} />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
