const users = [{
    id: "1",
    fullName: "Mehmet Seven",
    age: 32

},{
    id: "2",
    fullName: "Ahmet Günal",
    age: 12
}]

const posts = [{
    id: "1",
    title: "Mehmet'in gönderisi",
    user_id: "1"
},{
    id: "2",
    title: "Mehmet'in diğer gönderisi",
    user_id: "1"
},{
    id: "3",
    title: "Ahmet'in gönderisi",
    user_id: "2"
}]


const comments = [{
    id: "1",
    text: "Bu yorum Ahmet'in yorumudur",
    post_id: "1",
    user_id: "2"
},{
    id: "2",
    text: "Bu yorum Mehmet'in yorumudur",
    post_id: "1",
    user_id: "1"
}, {
    id: "3",
    text: "Bu yorum Ahmet'in 2. yorumudur",
    post_id: "2",
    user_id: "2"
}, {
    id: "4",
    text: "Bu yorum Mehmet'in 2. yorumudur",
    post_id: "3",
    user_id: "1"
}]


module.exports = {
    users, 
    posts, 
    comments
}