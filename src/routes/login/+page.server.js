import { redirect } from '@sveltejs/kit';
import crypto from 'crypto';
import {SECRET_SIGNATURE} from '$env/static/private';


export const actions = {
    login: async({cookies,request,locals})=>{

        const loginFormData = await request.formData();
        const email = loginFormData.get('email')?.toString()??'';
        const password = loginFormData.get('password')?.toString()??'';
        //create a base hash
        const hash = crypto.createHash('sha256');
        //add the password
        hash.update(password);
        //add the env secret
        hash.update(SECRET_SIGNATURE);
        // Obtain the hashed password
        const hashedPassword = hash.digest('hex');

        let loginResponse={
            email,
            error: true,
            message: '',
        }

        try{
            await locals.pb.collection('users').authWithPassword(
                email,
                hashedPassword
            );
            //console.log('auth store',locals.pb.authStore);
 
            
            if(locals.pb.authStore.baseToken) throw redirect(303,'/auth')
        }
        finally{
            if(!locals.pb.authStore.baseToken) return loginResponse
        }


        
    },

}