var API_URL = "";
if (process.env.NODE_ENV == 'production') {
    API_URL = 'https://park-be.dev.beyondxlabs.com';
} else {
    API_URL = 'http://192.168.1.19:9090';
}
export { API_URL };