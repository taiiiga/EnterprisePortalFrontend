const isHttps = false
const host = "192.168.31.18";
const ruslan = "192.168.31.106";
const port = 5103;

export const apiUrl = `${isHttps ? "https" : "http"}://${ruslan}:${port}/api/`;