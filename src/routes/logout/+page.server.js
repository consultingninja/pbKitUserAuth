import { redirect } from '@sveltejs/kit';

export function load({locals}){
    if(locals.userPb.authStore.baseToken) locals.userPb.authStore.clear();
    throw redirect(303,'/')
}