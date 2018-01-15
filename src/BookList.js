import React from 'react';
import PropTypes from 'prop-types';
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
							<div className="book">
								<div className="book-top">
				                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
				                   	<div className="book-shelf-changer">
							          <select onChange={(event) => changeShelf(event, book)} defaultValue={book.shelf?book.shelf:"none"}>
							            <option value="none" disabled>Move to...</option>
							            <option value="currentlyReading">Currently Reading</option>
							            <option value="wantToRead">Want to Read</option>
							            <option value="read">Read</option>
							            <option value="none">None</option>
							          </select>
							        </div>
				              	</div>
				                <div className="book-title">{book.title}</div>
				                <div className="book-authors">{book.authors}</div>
							</div>
						</li>	
					))
				}
			</ol>
		)
	}
}