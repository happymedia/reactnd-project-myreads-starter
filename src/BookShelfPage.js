import React from 'react';

import {Link} from 'react-router-dom';
import Bookshelf from './BookShelf';
import * as BooksAPI from './util/BooksAPI';
import './App.css';


class BookShelfPage extends React.Component {
	constructor(props){
    	super(props);
		this.state = {
		    allData:[],
		    currently:[],
		    read:[],
		    want:[]
		}
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

  render() {    
    let [currently, read, want] = [];

    currently = this.state.allData.filter((item) => item.shelf === "currentlyReading");
    read = this.state.allData.filter((item) => item.shelf === "read");
    want = this.state.allData.filter((item) => item.shelf === "wantToRead");
          
    return (
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
              hash: '#the-hash'
            }}>
              Add a book
            </Link>
          </div>
      </div>
    )
  }
}

export default BookShelfPage;
