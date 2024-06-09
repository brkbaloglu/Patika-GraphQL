const { ApolloServer, gql } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { users, posts, comments } = require("./data")

const typeDefs = gql`

    type User{
        id: ID!
        fullName: String!
        posts: [Posts!]!
        comments: [Comments!]!
    }

    type Posts{
        id:ID!
        title: String!
        user_id: ID!
        user: User!
        comments: [Comments!]!
    }

    type Comments{
        id: ID!
        text: String!
        post_id: ID!
        user: User!
        post: Posts!
    }

    type Query{

        users: [User!]!
        user(id: ID!): User!

        posts: [Posts!]!
        post(id: ID!): Posts!

        comments: [Comments!]!
        comment(id: ID!): Comments!
    }
`

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => {
            const user =  users.find(user => user.id === args.id)
            if (!user) {
                return new Error("User not found")
            }
            return user
        },
        posts: () => posts,
        post: (parent, args) => {
            const post = posts.find(post => post.id === args.id)
            if (!post) {
                return new Error("Post not found")
            }
            return post
        },
        comments: () => comments,
        comment: (parent, args) => {
            const comment = comments.find(comment => comment.id === args.id)
            if (!comment) {
                return new Error("Comment not found")
            }
            return comment
        }
    },
    User: {
        posts: (parent, args) => {
            return posts.filter(post => post.user_id === parent.id)
        },
        comments: (parent, args) => {
            return comments.filter(comment => comment.user_id === parent.id)
        }
    },
    Posts: {
        user: (parent, args) => {
            return users.find(user => user.id === parent.user_id)
        },
        comments: (parent, args) => {
            return comments.filter(comment => comment.post_id === parent.id)
        }
    },
    Comments: {
        user: (parent, args) => {
            return users.find(user => user.id === parent.user_id) 
        },
        post: (parent, args) => {
            return posts.find(post => post.id === parent.post_id)
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