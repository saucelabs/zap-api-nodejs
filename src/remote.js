/* Zed Attack Proxy (ZAP) and its related class files.
 *
 * ZAP is an HTTP/HTTPS proxy for assessing web application security.
 *
 * Copyright 2018 the ZAP development team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


'use strict';

const fakeAuth = 'Bearer eyJraWQiOiJyZXN0byIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJleHAiOjE1ODg4NTQ3NTUsImlhdCI6MTU4ODg1Mjk1NSwianRpIjoiZjI5ZDU3NjgtZmFmOS00YTZjLWFmMDUtMDU5NDlkZGZlYTY2IiwidXNlcm5hbWUiOiJjYi1vbmJvYXJkaW5nIn0.tx4OpTlLC9fQ76anUheBQTd1Oz_N1cnsoEiaPW1mCiI'
const headers = { Authorization: fakeAuth }
const endpoint = '/session'

/**
 * This file was automatically generated.
 */
function Remote(clientApi, baseUrl) {
  this.api = clientApi;
  this.baseUrl = baseUrl
}

/**
 * Starts a remote session.
 **/
Remote.prototype.start = function (callback) {
    const options = {
        url: this.api.requestOptions.proxy + endpoint,
        method: 'post',
        body: {},
        headers,
        proxy: null
    }

    if (typeof callback === 'function') {
        this.api.req(options, (err, res, { sessionId }) => {
            this.api.apiKey = sessionId
            callback({ sessionId })
        });
        return;
    }
    
    return this.api.reqPromise(options).then(({ sessionId }) => {
        this.api.apiKey = sessionId
        return { sessionId }
    })
};

/**
 * Stops a remote session
 **/
Remote.prototype.stop = function (callback) {
    const options = {
        url: this.api.requestOptions.proxy + endpoint + '/' + this.api.apiKey,
        method: 'delete',
        headers,
        proxy: null
    }

    if (typeof callback === 'function') {
        this.api.req(options, (err, res, { sessionId }) => {
            delete this.api.apiKey
            callback({ sessionId })
        });
        return;
    }
    
    return this.api.reqPromise(options).then(({ sessionId }) => {
        delete this.api.apiKey
        return { sessionId }
    })
};

module.exports = Remote;
