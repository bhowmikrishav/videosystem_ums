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
                reply.setCookie('user_token', signup_res.user_token, {maxAge:1000*60*60*42, signed:false, sameSite:'none'})
                return signup_res
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    },
    {
        method: 'POST',
        url: '/whoami',
        schema:{
            body:{
                type: 'object',
                properties: {
                    user_token:   {type:'string', maxLength:1000, minLength:8, "pattern": "^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$"}
                }
            }
        },
        handler: async (request, reply) => {
            const body = request.body
            try{
                return await User.whoami(body.user_token)
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    },
    {
        method: 'POST',
        url: '/update_profile',
        schema:{
            body:{
                type: 'object',
                properties: {
                    user_token:   {type:'string', maxLength:1000, minLength:8, "pattern": "^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$"},
                    name:         {type:'string', maxLength:63, minLength:1}
                }
            }
        },
        handler: async (request, reply) => {
            const body = request.body
            try{
                return await User.update_user(body.user_token, body)
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    }
]