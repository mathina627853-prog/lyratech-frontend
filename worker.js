export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        const routes = {
            "/": "/index.html",
            "/products": "/products.html",
            "/about": "/about.html",
            "/contact": "/contact.html"
        };

        if (routes[url.pathname]) {
            url.pathname = routes[url.pathname];
        }

        return env.ASSETS.fetch(new Request(url, request));
    }
};