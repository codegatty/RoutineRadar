console.log("API gateway");

const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// Define the routes and their target ports
const routes = {
    '/admin': "http://172.18.0.4:5000/",
    '/challenge': "http://172.18.0.6:5001/",
    '/user': "http://172.18.0.7:5002/",
    '/roadmap': "http://172.18.0.8:5009/",
    '/routine': "http://172.18.0.9:5005/",
    '/badges': "http://172.18.0.5:5008/"
};

// Create a proxy for each route
for (const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            console.log(`Proxying request from ${req.originalUrl} to ${target}`);
        },
        onError: (err, req, res) => {
            console.error(`Error proxying request from ${req.originalUrl} to ${target}:`, err);
            res.status(500).send('Proxy error');
        }
    }));
}

app.listen(8000, () => {
    console.log("API listening on port 8000");
});
