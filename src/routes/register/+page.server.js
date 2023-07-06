import crypto from 'crypto';
import {SECRET_SIGNATURE} from '$env/static/private';
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
    
        try{
            //hash the pass so we aren't sending or storing plain text
            const hash = crypto.createHash('sha256');
            //add the password
            hash.update(password);
            //add the env secret
            hash.update(SECRET_SIGNATURE);
            // Obtain the hashed password
            const hashedPassword = hash.digest('hex');
            //set hashed password to data object
            data.password = hashedPassword;
            data.passwordConfirm = hashedPassword;
            //create the user
            const result = await locals.userPb.collection('users').create(data);
            console.log('result',result);
            if(result) createResult = true;
        }

            finally{
                if(!createResult){
                    return{
                        emailUsed:true,
                        email:email,
                        firstname,
                        lastname,
                        username: userNospace
                    }
                }
                if(createResult) throw redirect(303,'/login')

                
            }
    




    }
}