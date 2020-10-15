import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {getAuthorQuery,addBookMutation,getBooksQuery} from '../Queries/queries'


class AddBook extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            genre:"",
            authorID:""
        }
    }
    displayAuthors() {
        let data = this.props.getAuthorsQuery;
        if (data.loading) {
            return <option disabled>Loading Authors</option>
        }
        else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    submitForm(e){
       e.preventDefault()
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorID:this.state.authorID
            },
            refetchQueries:[{query:getBooksQuery}]
        })
    }
    render() {
        console.log(this.props)
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name</label>
                    <input type="text" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                </div>
                <div className="field">
                    <label>Genre</label>
                    <input type="text" onChange={(e)=>{this.setState({genre:e.target.value})}} />
                </div>
                <div className="field">
                    <label>Author</label>
                    <select onChange={e=>{this.setState({authorID:e.target.value})}}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}


export default compose(
graphql(getAuthorQuery,{name:"getAuthorsQuery"}),
graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)