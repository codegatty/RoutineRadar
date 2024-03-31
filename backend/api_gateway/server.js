console.log("API gateway")

const express = require('express');
const app = express();
const {createProxyMiddleware}=require('http-proxy-middleware')
//define their routes and ports
const routes={
    '/admin':"http://localhost:5000/",
    '/challenge':"http://localhost:5001"
}

//create a proxy for each route
for (const route in routes){
    const target=routes[route];
    app.use(route,createProxyMiddleware({target}));
}

app.listen(8000,()=>{
    console.log("API listening on 8000");
});