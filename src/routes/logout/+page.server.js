import { redirect } from '@sveltejs/kit';

export function load({locals}){
    if(locals.pb.authStore.baseToken) locals.pb.authStore.clear();
    throw redirect(303,'/')
}