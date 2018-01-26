import React from 'react';

const Book = (props) => {
	const {book, changeShelf} = props;	
	const emptyVal = 'none';
	
	return (
		<div className="book">
			<div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail:""})` }}></div>
               	<div className="book-shelf-changer">
		          <select onChange={(event) => changeShelf(event, book)} defaultValue={book.shelf ? book.shelf : emptyVal}>
		            <option value={emptyVal} disabled>Move to...</option>
		            <option value="currentlyReading">Currently Reading</option>
		            <option value="wantToRead">Want to Read</option>
		            <option value="read">Read</option>
		            <option value={emptyVal}>None</option>
		          </select>
		        </div>
          	</div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
		</div>
	)
}
export default Book;