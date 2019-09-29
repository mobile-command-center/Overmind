import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class EnrollmentService {
    constructor() {
        this._client = new ApolloClient({
            uri: 'https://kd579k2xk8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/graphql'
        });
    }

    read(limit) {
        return this._client
            .query({
                query: gql`
                    query {
                        readEnrollment(limit:${limit}) {
                            edges {
                                EL_ID
                                ST
                                CONST_ID
                                APL_ID
                                CPAN
                                PROD
                                EE_ID
                                DATE
                            }
                            totalCount
                        }
                    }
                `,
            });
    }
}

export default new EnrollmentService();