import React from 'react';
import BookList from './BookList';

const BookShelf = (props) => {	
	const {shelf, books, changeShelf} = props;
	return (
		<div className="bookshelf">
	        <h2 className="bookshelf-title">{shelf}</h2>
	        <div className="bookshelf-books">
	          <BookList changeShelf={changeShelf} books={books} />   
	        </div>
	    </div>
	)
}

export default BookShelf;