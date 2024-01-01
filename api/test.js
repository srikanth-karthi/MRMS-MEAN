const token = "U2FsdGVkX1+ek/IZJ+iwpDFND2H8LJ2FN+LC+Mr/WQuIcVDX5Tig2SlUaRj/llTZ93b8+vUg7P925E4zxtJzhGaH5a7YA/KS6vsaT+HHTr12c1A7hO7xZoW0oslcSa44Q2Eymp6fF9TZxSU3bVmRC3w4Mg7xn5xDsfHHnqpoGSoQOgs+4/W3vY6mrr/sEnU4gTzLC5x1zY16NFXwmeLNbQlYRcA2ZFcrWy1TDkGxHaM1cxLiOW8zbT0WfezLVe1nzTS+JdolTBpsFXLTjPfwMg=="
// Encode the token for URL parameter
const encodedToken = encodeURIComponent(token);
const url = `/files/${encodedToken}`;

const redis = require('redis');

// Connect to your Redis server
const client = redis.createClient({
  host: 'localhost', // Replace with your Redis host
  port: 6379, // Replace with your Redis port
  // Optionally, add a password if your Redis server requires authentication
  // password: 'YOUR_REDIS_PASSWORD',
});

// Handling connection errors
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Set a token in Redis
const setToken = (key, value) => {
  client.set(key, value, (err, reply) => {
    if (err) {
      console.error('Error setting token:', err);
    } else {
      console.log('Token set successfully:', reply);
    }
  });
};

// Get a token from Redis
const getToken = (key) => {
  client.get(key, (err, reply) => {
    if (err) {
      console.error('Error getting token:', err);
    } else {
      console.log('Retrieved token:', reply);
    }
  });
};

// Example usage
const tokenKey = 'access_token';
const sampleTokenValue = 'your_sample_token_value';

// Set a token in Redis
setToken(tokenKey, sampleTokenValue);

// Get the token from Redis
getToken(tokenKey);

// Close the Redis connection when done (optional)
// client.quit();
