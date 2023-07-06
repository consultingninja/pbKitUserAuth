import { redirect } from '@sveltejs/kit';

export function load({locals}){
    console.log('base token',locals.userPb.authStore.token);
    console.log('valid',locals.userPb.authStore.isValid);
    if(!locals.userPb.authStore.token) throw redirect(303,'/login');

    const user = {
        firstname: locals.userPb.authStore.baseModel.firstname
    }


    return{
        user
    }
}