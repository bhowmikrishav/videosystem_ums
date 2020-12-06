module.exports = [
    {
        method: 'POST',
        url: '/signup',
        schema:{
            body:{
                type: 'object',
                properties: {
                    username:{type:'string', maxLength:32, minLength:3},
                    password:{type:'string', maxLength:32, minLength:3}
                }
            }
        },
        handler: async (request, reply) => {
            const body = request.body
            try{
                console.log(body);
            }catch(e){
                reply.code(301)
                return {error:e.message, result:null}
            }
        }
    }
]