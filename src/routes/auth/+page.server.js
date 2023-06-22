import { redirect } from '@sveltejs/kit';

export function load({locals}){
    console.log('base token',locals.pb.authStore.token);
    console.log('valid',locals.pb.authStore.isValid);
    if(!locals.pb.authStore.token) throw redirect(303,'/login');

    const user = {
        firstname: locals.pb.authStore.baseModel.firstname
    }


    return{
        user
    }
}