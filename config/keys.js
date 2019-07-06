if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
} else {
    module.exports = require('./keys_dev')
}


// module.exports = {
//     mongoURI : `mongodb+srv://ravi:Asdzxc123@cluster0-3mcux.mongodb.net/devconnector?retryWrites=true&w=majority`,
//     secretOrKey: 'secret'
// };