export function authHeader(token: string) {
    return {
        "Authorization": `Bearer ${token}`
    }
}