import { InMemoryCache, ApolloClient } from 'apollo-boost';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
    GRAPHQL_WS,
    GRAPHQL_HTTP
} from '../config';

const httpLink = new HttpLink({
    uri: GRAPHQL_HTTP
});

const wsLink = new WebSocketLink({
    uri: GRAPHQL_WS,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'x-hasura-admin-secret': 'mantra'
            }
        }
    }
});

const authLink = setContext((_, { headers }) => {

    let baseHeaders = {
        ...headers
    };
    baseHeaders['x-hasura-admin-secret'] = 'mantra';
    return { headers: baseHeaders };
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});

export default client;
