import gql from "graphql-tag";

export const MUTATION_REGISTER_USER = gql`
    mutation RegisterUser($username : String, $password: String){
        insert_todo(objects: {username: $username, password: $password, updated_at: NULL}) {
            returning {
                username
            }
        }
    }
`;