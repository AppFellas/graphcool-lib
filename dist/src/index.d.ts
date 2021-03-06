import { GraphQLClient } from 'graphql-request';
import { FunctionEvent, GraphcoolOptions, APIOptions, APIEndpoint, Endpoints } from './types';
import { GraphQLSchema } from 'graphql';
export { FunctionEvent, GraphcoolOptions, APIOptions };
export default class Graphcool {
    serviceId: string;
    token?: string;
    endpoints: Endpoints;
    constructor(serviceId: string, options?: GraphcoolOptions);
    getFullEndpoint(endpointKey?: APIEndpoint): any;
    api(endpoint?: APIEndpoint, options?: APIOptions): GraphQLClient;
    generateAuthToken(nodeId: string, typeName: string): Promise<string>;
    generateNodeToken(nodeId: string, typeName: string, expirationInSeconds?: number): Promise<string>;
    /** Returns an instance of the Simple API endpoint (based on graphql-tools) */
    createSchema(): Promise<GraphQLSchema>;
    validateToken(token: string): Promise<boolean>;
    checkPermissionQuery(query: string, variables?: any): Promise<boolean>;
    updateAll(typeName: string, filter?: {
        [key: string]: any;
    }): Promise<any>;
    deleteAll(typeName: string, filter?: {
        [key: string]: any;
    }): Promise<any>;
    private systemClient;
    private checkRootTokenIsSet;
}
export declare function fromEvent<T extends any>(event: FunctionEvent<T>, options?: GraphcoolOptions): Graphcool;
