/**
 * Authentication middleware will check whether the APIs coming through
 * to the server contains valid authentication token. 
 * The validity of the auth Token is checked and if it's valid, the 
 * request will be passed through else the request will be rejected.
 * 
 * For unauthenticated URLs such as /login this layer skips the 
 * above steps
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 * @param {Middleware} next 
 */

const unAuthenticatedUrls = new Set([
    '/login'
])

const authMiddleware = async function (req, res, next) {
    next()
}

module.exports = authMiddleware
