type cookieString = string
export const cookieParser = (cookie: cookieString) => {
    return JSON.parse(decodeURIComponent(cookie))
}