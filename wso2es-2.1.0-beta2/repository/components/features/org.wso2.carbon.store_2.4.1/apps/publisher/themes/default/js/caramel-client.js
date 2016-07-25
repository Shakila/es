/*
 * Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (caramel) {

    /**
     * Resolves absolute paths by adding app context prefix.
     * @param path
     * @return {*}
     */
    caramel.url = function (path) {
        if (path.length > 0) {
            return this.context + (path.charAt(0) !== '/' ? '/' : '') + path;
        }
        return this.context;
    };
    caramel.tenantedUrl = function (path) {
        var uri = window.location.href;//current page path
        var tenantedRegex = '([0-9A-Za-z-\\.@:%_\+~#=]+)/t/{1}([0-9A-Za-z-\\.@:%_\+~#=]+)';
//        var regex = '([0-9A-Za-z-\\.@:%_\+~#=]+)/{1}([0-9A-Za-z-\\.@:%_\+~#=]+)';
//        var domain;

        if (uri.match(tenantedRegex)) {
//            context = uri.match(tenantedRegex)[1];
            var domain = uri.match(tenantedRegex)[2];
            return this.context + '/t/' + domain + path;//this.context;;
        }else if(path.length>0){
            return this.context + (path.charAt(0) !== '/' ? '/' : '') + path;
        }
        return this.context;
    };

    caramel.get = function (path) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = caramel.url(args[0]);
        return $.get.apply(this, args)
    };

    caramel.post = function (path) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = caramel.url(args[0]);
        return $.post.apply(this, args)
    };

    caramel.ajax = function (options) {
        options.url = caramel.url(options.url);
        return $.ajax.call(this, options);
    };

})(caramel);