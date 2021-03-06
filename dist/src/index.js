"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var graphql_tools_1 = require("graphql-tools");
var apollo_link_http_1 = require("apollo-link-http");
var Graphcool = /** @class */ (function () {
    function Graphcool(serviceId, options) {
        var mergedOptions = __assign({ token: undefined }, options, { endpoints: __assign({ simple: "https://api.graph.cool/simple/v1/" + serviceId, relay: "https://api.graph.cool/relay/v1/" + serviceId, system: "https://api.graph.cool/system", subscriptions: "wss://subscriptions.graph.cool/v1/" + serviceId }, (options ? options.endpoints : {})) });
        this.endpoints = mergedOptions.endpoints;
        this.serviceId = serviceId;
        this.token = mergedOptions.token;
    }
    Graphcool.prototype.getFullEndpoint = function (endpointKey) {
        if (endpointKey === void 0) { endpointKey = 'simple/v1'; }
        return this.endpoints[endpointKey.split('/')[0]];
    };
    Graphcool.prototype.api = function (endpoint, options) {
        if (endpoint === void 0) { endpoint = 'simple/v1'; }
        var url = this.getFullEndpoint(endpoint);
        var token = options && options.token ? options.token : this.token;
        if (token) {
            return new graphql_request_1.GraphQLClient(url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
        }
        else {
            return new graphql_request_1.GraphQLClient(url);
        }
    };
    Graphcool.prototype.generateAuthToken = function (nodeId, typeName) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkRootTokenIsSet('generateNodeToken');
                        query = "\n      mutation {\n        generateNodeToken(input: {\n          rootToken: \"" + this.token + "\"\n          serviceId: \"" + this.serviceId + "\"\n          nodeId: \"" + nodeId + "\"\n          modelName: \"" + typeName + "\"\n          clientMutationId: \"static\"\n        }) {\n          token\n        }\n      }\n    ";
                        return [4 /*yield*/, this.systemClient().request(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.generateNodeToken.token];
                }
            });
        });
    };
    Graphcool.prototype.generateNodeToken = function (nodeId, typeName, expirationInSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var expiration, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkRootTokenIsSet('generateNodeToken');
                        expiration = expirationInSeconds ? "expirationInSeconds: " + expirationInSeconds : '';
                        query = "\n      mutation {\n        generateNodeToken(input: {\n          rootToken: \"" + this.token + "\"\n          serviceId: \"" + this.serviceId + "\"\n          nodeId: \"" + nodeId + "\"\n          modelName: \"" + typeName + "\"\n          clientMutationId: \"static\"\n          " + expiration + "\n        }) {\n          token\n        }\n      }\n    ";
                        return [4 /*yield*/, this.systemClient().request(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.generateNodeToken.token];
                }
            });
        });
    };
    /** Returns an instance of the Simple API endpoint (based on graphql-tools) */
    Graphcool.prototype.createSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var link, schema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        link = new apollo_link_http_1.HttpLink({ uri: this.endpoints.simple, fetch: fetch });
                        return [4 /*yield*/, graphql_tools_1.introspectSchema(link)];
                    case 1:
                        schema = _a.sent();
                        return [2 /*return*/, graphql_tools_1.makeRemoteExecutableSchema({ schema: schema, link: link })];
                }
            });
        });
    };
    Graphcool.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented yet');
            });
        });
    };
    Graphcool.prototype.checkPermissionQuery = function (query, variables) {
        throw new Error('Not implemented yet');
    };
    Graphcool.prototype.updateAll = function (typeName, filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented yet');
            });
        });
    };
    Graphcool.prototype.deleteAll = function (typeName, filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not implemented yet');
            });
        });
    };
    Graphcool.prototype.systemClient = function () {
        if (!this.endpoints.system) {
            throw new Error('Please provide the system endpoint');
        }
        return new graphql_request_1.GraphQLClient(this.endpoints.system);
    };
    Graphcool.prototype.checkRootTokenIsSet = function (functionName) {
        if (this.token == null) {
            throw new Error("Graphcool must be instantiated with a rootToken when calling '" + functionName + "': new Graphcool('service-id', {token: 'rootToken'})");
        }
    };
    return Graphcool;
}());
exports.default = Graphcool;
function fromEvent(event, options) {
    return new Graphcool(event.context.graphcool.serviceId || event.context.graphcool.projectId, __assign({ token: event.context.graphcool.rootToken, endpoints: event.context.graphcool.endpoints }, options));
}
exports.fromEvent = fromEvent;
//# sourceMappingURL=index.js.map