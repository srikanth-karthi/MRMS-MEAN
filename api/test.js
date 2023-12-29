const token = "U2FsdGVkX1+ek/IZJ+iwpDFND2H8LJ2FN+LC+Mr/WQuIcVDX5Tig2SlUaRj/llTZ93b8+vUg7P925E4zxtJzhGaH5a7YA/KS6vsaT+HHTr12c1A7hO7xZoW0oslcSa44Q2Eymp6fF9TZxSU3bVmRC3w4Mg7xn5xDsfHHnqpoGSoQOgs+4/W3vY6mrr/sEnU4gTzLC5x1zY16NFXwmeLNbQlYRcA2ZFcrWy1TDkGxHaM1cxLiOW8zbT0WfezLVe1nzTS+JdolTBpsFXLTjPfwMg=="
// Encode the token for URL parameter
const encodedToken = encodeURIComponent(token);

// Use `encodedToken` in the URL parameter:
const url = `/files/${encodedToken}`;
// console.log('URL with encoded token:', url);
const redis = require('redis');
// Import the required Redis package
const redis = require('redis');

// Create a Redis client instance
const client = redis.createClient({
  port: 6379,       // Redis server port
  host: '127.0.0.1' // Redis server host
});

// Event listeners to handle client events
client.on('connect', () => {
  console.log('Connected to Redis...');
});

client.on('ready', () => {
  console.log('Redis client is ready to use...');
});

client.on('error', (err) => {
  console.error('Error in Redis client:', err);
});

client.on('end', () => {
  console.log('Disconnected from Redis...');
});

// Example: Setting and getting data in Redis
client.set('myKey', 'myValue', (err, reply) => {
  if (err) {
    console.error('Error setting key:', err);
  } else {
    console.log('Key set:', reply);

    // Get the value of the key
    client.get('myKey', (err, value) => {
      if (err) {
        console.error('Error getting value:', err);
      } else {
        console.log('Value retrieved:', value);
      }
      
      // Close the Redis connection
      client.quit();
    });
  }
});
