import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './util/BooksAPI';
export default class BookList extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
	getDetail = (bookId)=>{
	  BooksAPI.get(bookId).then((data) => {
        console.log(data)
      }); 
	}
	render() {
		const {books, changeShelf} = this.props;

		return (
			<ol className="books-grid">
				{
					books.map((book)=>(
						<li key={book.id} onClick={() => this.getDetail(book.id)}>
							<Book book={book} changeShelf={changeShelf}/>
						</li>	
					))
				}
			</ol>
		)
	}
}