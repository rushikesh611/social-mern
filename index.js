const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req})
});

mongoose.connect(MONGODB,{useNewUrlParser: true}).then(()=>{
    console.log('MongoDb Connected');
    return server.listen({ port:5000});
}).then(res => {
    console.log(`Server running at ${res.url}`);
})


// 1:35:00 https://www.youtube.com/watch?v=n1mdAPFq2Os&list=WL&index=29w