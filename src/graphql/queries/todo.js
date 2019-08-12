import gql from "graphql-tag";

export const QUERY_USER = gql`
    query GetUser($username : String, $password: String){
        Users(where: {password: {_eq: $password}, username: {_eq: $username}}) {
            username
            password
        }
    }
`;