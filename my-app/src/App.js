 import React from 'react';
import BookList from './Components/BookList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import AddBook from './Components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Deepak's Reading List</h1>
        <BookList />
        
      </div>
    </ApolloProvider>
  );
}

export default App;
