const {User} = require('../actions/user')

module.exports = [
    {
        method: 'POST',
        url: '/signup',
        schema:{
            body:{
                type: 'object',
                properties: {
                    username:   {type:'string', maxLength:32, minLength:3, "pattern": "^([a-z]|[0-9])*$"},
                    password:   {type:'string', maxLength:32, minLength:3},
                    name:       {type:'string', maxLength:63, minLength:1}
                }
            }
        },
        handler: async (request, reply) => {
            const body = request.body
            try{
                const signup_res = await User.signup(body.username, body.password, body.name)
                return signup_res
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    },
    {
        method: 'POST',
        url: '/login',
        schema:{
            body:{
                type: 'object',
                properties: {
                    username:   {type:'string', maxLength:32, minLength:3, "pattern": "^([a-z]|[0-9])*$"},
                    password:   {type:'string', maxLength:32, minLength:3}
                }
            }
        },
        handler: async (request, reply) => {
            const body = request.body
            try{
                const signup_res = await User.login(body.username, body.password, body.name)
                return signup_res
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    }
]