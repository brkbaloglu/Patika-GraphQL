const { ApolloServer, gql } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { users, posts, comments } = require("./data")

const typeDefs = gql`

    type User{
        id: ID!
        fullName: String!
        age: Int!
        posts: [Posts!]!
        comments: [Comments!]!
    }
    
    input CreateUserInput{
        fullName: String!
        age: Int!
    }

    input UpdateUserInput{
        fullName: String
        age: Int
    }

    type Posts{
        id:ID!
        title: String!
        user_id: ID!
        user: User!
        comments: [Comments!]!
    }
    input CreatePostInput{
        title: String!
        user_id: ID!
    }
    input UpdatePostInput{
        title: String
        user_id: ID
    }

    type Comments{
        id: ID!
        text: String!
        post_id: ID!
        user_id: ID!
        user: User!
        post: Posts!
    }
    input CreateCommentInput{
        text: String!
        post_id: ID!
        user_id: ID!
    }

    input UpdateCommentInput{
        text: String
        post_id: ID
        user_id: ID
    }

    type DeleteAllOutput{
        count: Int!
    }

    type Query{

        users: [User!]!
        user(id: ID!): User!

        posts: [Posts!]!
        post(id: ID!): Posts!

        comments: [Comments!]!
        comment(id: ID!): Comments!
    }

        type Mutation{

            createUser(data: CreateUserInput!): User!
            updateUser(id: ID!, data: UpdateUserInput!): User!
            deleteUser(id: ID!): User!
            deleteAllUsers: DeleteAllOutput!

            createPost(data: CreatePostInput!): Posts!
            updatePost(id: ID!, data: UpdatePostInput!): Posts!
            deletePost(id: ID!):Posts!
            deleteAllPosts: DeleteAllOutput!

            createComment(data: CreateCommentInput!): Comments!
            updateComment(id: ID!, data: UpdateCommentInput!): Comments!
            deleteComment(id: ID!): Comments!
            deleteAllComments: DeleteAllOutput!
        }
`

const resolvers = {
    Mutation:{
        
        createUser: (parent, args) => {
            const user = {id: Math.ceil(Math.random() * 100000000000000000000) , fullName: args.data.fullName}
            users.push(user)
            return user
        },

        updateUser: (parent, args) => {
            const userIndex = users.findIndex(user => user.id === args.id)
            if (userIndex === -1) {
                return new Error("User not found")
            }
            const updatedUser = users[userIndex] = { ...users[userIndex], ...args.data}
            return updatedUser

        },

        deleteUser: (parent, args) => {
            const userIndex = users.findIndex(user => user.id = args.id)

            if (!userIndex === -1) {
                return new Error("User not found")
            }

            const deletedUser = users[userIndex]
            users.splice(userIndex, 1)

            return deletedUser

        },

        deleteAllUsers: () => {
            const length = users.length
            users.splice(0, length)

            return { count: length }
        },

        createPost: (parent, args) => {
            const post = {id: Math.ceil(Math.random() * 100000000000000000000), title: args.data.title, user_id: args.data.user_id }
            posts.push(post)
            return post
        },
        updatePost: (parent, args) => {
            const postIndex = posts.findIndex(post => post.id === args.id)
            if (postIndex === -1) {
                return new Error("Post not found")
            }
            const updatedPost = posts[postIndex] = { ...posts[postIndex], ...args.data}
            return updatedPost
        },

        deletePost: (parent, args) => {
            const postIndex = posts.findIndex(post => post.id = args.id)

            if (!postIndex === -1) {
                return new Error("Post not found")
            }

            const deletedPost = posts[postIndex]
            posts.splice(postIndex, 1)

            return deletedPost

        },

        deleteAllPosts: () => {
            const length = posts.length
            posts.splice(0, length)
            return { count: length }
        },

        createComment: (parent, args) => {
            const comment = {id: Math.ceil(Math.random() * 100000000000000000000), text: args.data.text, post_id: args.data.post_id, user_id: args.data.user_id }
            comments.push(comment)
            return comment
        },
        updateComment: (parent, args) => {
            const commentIndex = comments.findIndex(comment => comment.id === args.id)
            if (commentIndex === -1) {
                return new Error("Comment not found")
            }

            const updatedComment = comments[commentIndex] = {...comments[commentIndex], ...args.data}
            return updatedComment
        },
        deleteComment: (parent, args) => {
            const commentIndex = comments.findIndex(comment => comment.id = args.id)

            if (!commentIndex=== -1) {
                return new Error("Comment not found")
            }

            const deletedComment = comments[commentIndex]
            comments.splice(commentIndex, 1)

            return deletedComment

        },
        deleteAllComments: () => {
            const length = comments.length
            comments.splice(0, length)
            return { count: length }
        }

    },
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