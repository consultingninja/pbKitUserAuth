import { redirect } from '@sveltejs/kit';

export const actions={
    register: async ({request,locals})=>{
        
        const form = await request.formData();
    
        const firstname = form.get('firstname')?? '';
        const lastname = form.get('lastname')?? '';
        const email = form.get('email')??'';
        const password = form.get('password')??'';
        const username = form.get('username')?? '';
        //remove all white space since not allowed in PB
        const userNospace = username.replace(/\s+/g,'');
        console.log('username',userNospace);

        let createResult = false;
    
        const data = {
            firstname,
            lastname,
            email,
            password: '',
            passwordConfirm: '',
            username: userNospace
        };

        let registerResponse = {
            error:false,
            email:email,
            firstname,
            lastname,
            username: userNospace,
            message: ''
        }
    
        try{
            data.password = password;
            data.passwordConfirm = password;
            //create the user
            const result = await locals.userPb.collection('users').create(data);
            //console.log('result',result);
            if(result) createResult = true;
        }catch(err){
            console.log('error',err);
            registerResponse.error = true;
            registerResponse.message = message;

        }

            finally{
                if(!createResult){
                    return registerResponse;
                }
                if(createResult) throw redirect(303,'/login')

                
            }
    




    }
}