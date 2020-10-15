import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../Queries/queries'


class BookList extends Component {

    displayBook() {
        let data = this.props.data;
        if (data.loading) {
            return <div>data is loading</div>
        }
        else {
            return data.books.map((book) => {
                return <li>{book.name}</li>
            })
        }
    }

    render() {
        console.log(this.props.data)
        return (
            <div>
                <ul>
                    {this.displayBook()}
                </ul>
            </div>
        )
    }
}


export default graphql(getBooksQuery)(BookList)