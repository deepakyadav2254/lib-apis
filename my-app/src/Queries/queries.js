import { gql } from 'apollo-boost'

const getAuthorQuery = gql`{
    authors{
        name
        id
    }
}`

const getBooksQuery = gql`{
    books{
        name
        id
    }
}`

const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorID:String!){
        addBook(name:$name,genre:$genre,authorID:$authorID){
        name 
        id
    }
}
`
const getBookQuery = gql`
query($id:ID){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`

export { getAuthorQuery, getBooksQuery, addBookMutation ,getBookQuery}