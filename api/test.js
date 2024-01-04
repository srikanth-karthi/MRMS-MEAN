const token = "U2FsdGVkX199QKdw9vIPy/RCp2qfWj7Ba6OFCmMxVc9SiEOyawzp98uMv+n5kg6DW/we52/cMipGrM8DB02TtHxmLmK3vUA3sZdL7L+InYho4eZ9vhVVLs+eO6q+zh+xVOfliThsJAgBgHxpC9oceg=="
// Encode the token for URL parameter
const encodedToken = encodeURIComponent(token);
const url = `/files/${encodedToken}`;
console.log(url);
