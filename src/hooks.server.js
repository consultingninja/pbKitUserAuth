import { PB } from '$lib/server/server';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = PB;

    // Load the authStore from the cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try{
        //refresh the auth if it is valid
        if(!event.locals.pb.authStore.isValid) await event.locals.pb.authStore.authRefresh();
        //spread the model to locals.user to be available in all pages
        event.locals.user = {...event.locals.pb.authStore.model};
        
    } catch (err) {
        console.log('error in hooks')
		event.locals.pb.authStore.clear();
	}

    const response = await resolve(event);

    // Set the cookie
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie()
	);
    return response;
};