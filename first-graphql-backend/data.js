
const authors = [{
    id: "1",
    name: "Albert",
    surname: "Camus",
    age: 50,
    // books: [{
    //     id: "1",
    //     title: "Test Title",
    //     score: 7.8,
    //     isPublished: false
    // },{
    //     id: "2",
    //     title: "Test Title 2",
    //     score: 8.3,
    //     isPublished: true
    // }]
},{
    id: "2",
    name: "Victor",
    surname: "Hugo",
    age: 52,
    // books: [{
    //     id: "3",
    //     title: "Test Title 3",
    //     score: 8.2,
    //     isPublished: true
    // },{
    //     id: "4",
    //     title: "Test Title 4",
    //     score: 7.3,
    //     isPublished: false
    // }]
},{
    id: "3",
    name: "Burak",
    surname: "Baloğlu",
    age: 22,
    books: []
}]

const books = [{
    id: "1",
    title: "Book1",
    author_id: "1",
    score: 6.9,
    isPublished: true
},{
    id: "2",
    title: "Book2",
    author_id: "1",
    score: 6.2,
    isPublished: false
},{
    id: "3",
    title: "Book3",
    author_id: "2",
    score: 6.2,
    isPublished: false
}]

module.exports = {
    authors, books
}