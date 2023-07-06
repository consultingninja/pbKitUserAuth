import { redirect } from '@sveltejs/kit';

export function load({locals}){
    if(locals.userPb.authStore.baseToken) locals.pb.authStore.clear();
    throw redirect(303,'/')
}