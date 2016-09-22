'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var _      = require('lodash');

class AdwordsAuth {

    /**
     * @inheritDoc
     */
    constructor(credentials, redirectUrl) {
        this.credentials = credentials;
        this.oauth2Client = new OAuth2(
            this.credentials.client_id,
            this.credentials.client_secret,
            redirectUrl
        );
    }

    /**
     * Generates an Authentication Url
     * @access public
     * @return {string} a URL to redirect to
     */
    generateAuthenticationUrl(opts) {
        return this.oauth2Client.generateAuthUrl(_.assign({
            scope : ['https://www.googleapis.com/auth/adwords' ]
        }, opts ));
    }

    /**
     * Gets an access+refresh token from an authorization code
     * @access public
     * @param code {string} a coded string
     * @param callback {function}
     */
    getAccessTokenFromAuthorizationCode(code, callback) {
        this.oauth2Client.getToken(code, callback);
    }

    /**
     * Refreshes the access token
     * @access public
     * @param refreshToken {string} a refresh token
     * @param callback {function} a function with error and the new access token
     */
    refreshAccessToken(refreshToken, callback) {
        this.oauth2Client.setCredentials({
            refresh_token: refreshToken
        });
        this.oauth2Client.refreshAccessToken(callback)
    }

}

module.exports = AdwordsAuth;
