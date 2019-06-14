const secretProperties = require('../secret-properties.json');

module.exports = {

    /**
     * Checks the 'apiKey' header from the request and validates whether it is
     * the same as the required apiKey for authorisation.
     */
    requireAuth(request, response, next) {
        const { 'api-key': apiKey } = request.headers;

        if (apiKey === secretProperties.apiKey) {
            next();
        }
        else {
            console.log(`User is unauthorised, 'apiKey' header was invalid.`);
            response.status(403).send({ error: 'Not authorised.' });
        }
    }
}