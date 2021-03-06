"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var src_1 = require("../src/");
var fetchMock = require("fetch-mock");
ava_1.default('fromEvent', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool;
    return __generator(this, function (_a) {
        graphcool = src_1.fromEvent(testEvent);
        t.is(graphcool.endpoints.simple, 'https://api.graph.cool/simple/v1/test-service-id');
        t.is(graphcool.token, 'test-root-token');
        return [2 /*return*/];
    });
}); });
ava_1.default('api', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool, api, response, apiWithCustomToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphcool = src_1.fromEvent(testEvent);
                api = graphcool.api('simple/v1');
                fetchMock.post(simpleApiEndpoint, { body: { data: { allCats: [{ id: 'cat-1' }] } }, headers: { 'Content-Type': 'application/json' } });
                return [4 /*yield*/, api.request('{allCats{id}}')];
            case 1:
                response = _a.sent();
                t.is(fetchMock.lastOptions().headers.Authorization, "Bearer " + testEvent.context.graphcool.rootToken);
                t.deepEqual(response, { allCats: [{ id: 'cat-1' }] });
                apiWithCustomToken = graphcool.api('simple/v1', { token: 'custom-token' });
                return [4 /*yield*/, apiWithCustomToken.request('{allCats{id}}')];
            case 2:
                _a.sent();
                t.is(fetchMock.lastOptions().headers.Authorization, "Bearer custom-token");
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('generateAuthToken', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphcool = src_1.fromEvent(testEvent);
                fetchMock.post(systemApiEndpoint, { body: { data: { generateNodeToken: { token: 'test-token' } } }, headers: { 'Content-Type': 'application/json' } });
                return [4 /*yield*/, graphcool.generateAuthToken('test-node-id', 'TestType')];
            case 1:
                response = _a.sent();
                t.is(response, 'test-token');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('generateNodeToken', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphcool = src_1.fromEvent(testEvent);
                fetchMock.post(systemApiEndpoint, { body: { data: { generateNodeToken: { token: 'test-token' } } }, headers: { 'Content-Type': 'application/json' } });
                return [4 /*yield*/, graphcool.generateNodeToken('test-node-id', 'TestType')];
            case 1:
                response = _a.sent();
                t.is(response, 'test-token');
                return [2 /*return*/];
        }
    });
}); });
var testEvent = {
    data: {
        myBool: true,
        myInt: 7,
    },
    context: {
        request: {
            sourceIp: 'test-ip',
            headers: null,
            httpMethod: 'post'
        },
        graphcool: {
            rootToken: 'test-root-token',
            serviceId: 'test-service-id',
            alias: 'test-alias',
            endpoints: {
                simple: 'https://api.graph.cool/simple/v1/test-service-id',
                relay: 'https://api.graph.cool/relay/v1/test-service-id',
                system: 'https://api.graph.cool/system',
                subscriptions: 'wss://subscriptions.graph.cool/v1/test-service-id',
            }
        },
        environment: null,
        auth: {
            nodeId: 'test-node-id',
            typeName: 'test-type',
            token: 'test-node-token'
        },
        sessionCache: null
    }
};
var simpleApiEndpoint = 'https://api.graph.cool/simple/v1/test-service-id';
var systemApiEndpoint = 'https://api.graph.cool/system';
//# sourceMappingURL=test.js.map