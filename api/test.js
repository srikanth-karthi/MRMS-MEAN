const token = "U2FsdGVkX1+ek/IZJ+iwpDFND2H8LJ2FN+LC+Mr/WQuIcVDX5Tig2SlUaRj/llTZ93b8+vUg7P925E4zxtJzhGaH5a7YA/KS6vsaT+HHTr12c1A7hO7xZoW0oslcSa44Q2Eymp6fF9TZxSU3bVmRC3w4Mg7xn5xDsfHHnqpoGSoQOgs+4/W3vY6mrr/sEnU4gTzLC5x1zY16NFXwmeLNbQlYRcA2ZFcrWy1TDkGxHaM1cxLiOW8zbT0WfezLVe1nzTS+JdolTBpsFXLTjPfwMg=="
// Encode the token for URL parameter
const encodedToken = encodeURIComponent(token);

// Use `encodedToken` in the URL parameter:
const url = `/files/${encodedToken}`;
// console.log('URL with encoded token:', url);
const redis = require("redis"); 
const redisclient = redis.createClient(); 

(async () => { 
	await redisclient.connect(); 
})(); 

console.log("Connecting to the Redis"); 

redisclient.on("ready", () => { 
	console.log("Connected!"); 
}); 

redisclient.on("error", (err) => { 
	console.log("Error in the Connection"); 
}); 
