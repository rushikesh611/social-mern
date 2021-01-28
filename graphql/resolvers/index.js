const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comment.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subsciption
    }
};