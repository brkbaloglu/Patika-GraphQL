const { ApolloServer, gql } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { books, authors } = require("./data")

const typeDefs = gql`

    type Authors{
        id: ID!
        name: String!
        surname: String
        age: Int
        books(filter: String): [Books!]
    }

    type Books{
        id: ID!
        title: String!
        author: Authors!
        score: Float
        isPublished: Boolean
    }
    
    type Book{
        id: ID!
        title: String!
        author: Authors!
        author_id: String!
        score: Float
        isPublished: Boolean
    }
    
    type Query{
       books: [Books!]
       book(id: ID!): Book!
       authors: [Authors!]
       author(id: ID!): Authors!
    }
`

const resolvers = {
    // Query: {
    //     books: () => {
    //         return 
    //     }
    // }
    Query:{
        books: () => books,
        authors: () => authors,
        book: (parent, args) => {
            const data = books.find(book => book.id === args.id)
            return data
        }, 
        author: (parent, args) => {
            const data = authors.find(author => author.id === args.id)
            return data
        }
        // hello: () => { return "world" }
    },
    Book: {
        author: (parent, args) => {
            return authors.find(author => author.id === parent.author_id) 
        }
    },
    Authors: {
        books: (parent, args) => {
            let filtered = books.filter(book => book.author_id === parent.id)
            if (args.filter) {
                filtered =  filtered.filter(book => book.title.toLowerCase().startsWith(args.filter.toLowerCase()))   
            }
            return filtered
        }
    }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
})


server.listen(3000, () => {
    console.log("Server initialized on port 3000");
})