const express = require('express')
const app = express()
const {GraphqlHTTP, graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const cors =require('cors')
const schema =require('./Schema/schema')

app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

let dev_db_url = 'mongodb+srv://deepak:2254@cluster0-bqywo.mongodb.net/productstutorial?retryWrites=true&w=majority';
mongoose.connect(dev_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(4000, () => {
    console.log('app is listening on port 4000')
})