const isHttps = false
const host = "192.168.0.144";
const port = 5103;

export const apiUrl = `${isHttps ? "https" : "http"}://${host}:${port}/api/`;