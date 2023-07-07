import PocketBase from 'pocketbase'
import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    const adminPb = new PocketBase("http://127.0.0.1:8090");
    const userPb = new PocketBase("http://127.0.0.1:8090");
    //sign in
    await adminPb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    event.locals.adminPb = adminPb;
    event.locals.userPb = userPb;

    // Load the authStore from the cookie
	event.locals.userPb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    try{
        //refresh the auth if it is valid
        if(!event.locals.userPb.authStore.isValid) await event.locals.userPb.authStore.authRefresh();
        //spread the model to locals.user to be available in all pages
        event.locals.user = {...event.locals.userPb.authStore.model};
    } catch (err) {
        console.log('error in hooks')
		event.locals.userPb.authStore.clear();
	}
    const response = await resolve(event);
    // Set the cookie
	response.headers.set(
		'set-cookie',
		event.locals.userPb.authStore.exportToCookie()
	);
    return response;
};