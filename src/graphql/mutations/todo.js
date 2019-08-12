import gql from "graphql-tag";

export const MUTATION_REGISTER_USER = gql`
    mutation RegisterUser($username : String, $password: String){
        insert_Users(objects: {username: $username, password: $password, updated_at: null}) {
            returning {
                username
            }
        }
    }
`;