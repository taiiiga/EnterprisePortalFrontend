const isHttps = false
const host = "192.168.31.106";
const port = 5103;

export const apiUrl = `${isHttps ? "https" : "http"}://${host}:${port}/api/`;