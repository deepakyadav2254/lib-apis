const graphql = require('graphql')
const _ = require('lodash')
const Author = require('../models/author')
const Book = require('../models/book')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        return {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            age: { type: GraphQLString },
            books: {
                type: new graphql.GraphQLList(BookType),
                resolve(args, parent) {
                    return Book.find({ authorID: parent.id })
                }
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(args,parent){
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(args,parent){
                return Author.findById(args.id)
            }
        },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(args,parent){
                return Book.find({})
            }
        },
        authors:{
            type: new graphql.GraphQLList(AuthorType),
            resolve(args,parent){
                return Author.find({})
            }
        }
    }
})

const Mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorID:{type:GraphQLString}
            },
            resolve(parent,args){
                let book= new Book({
                    name:args.name,
                    genre:args.genre,
                    authorID:args.authorID
                })
                return book.save()
            }
            
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
