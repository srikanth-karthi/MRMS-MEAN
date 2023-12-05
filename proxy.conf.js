const PROXY_CONFIG = {
    "/api/": {
        target: "http://localhost:3000",
        secure: false
    }
};

export default PROXY_CONFIG;