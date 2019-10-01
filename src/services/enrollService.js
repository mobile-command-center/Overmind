import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class EnrollmentService {
    constructor() {
        this._client = new ApolloClient({
            uri: 'https://kd579k2xk8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/graphql'
        });
    }

    read(limit, input) {
        if(input) {
            return this._client
            .query({
                query: gql`
                    query {
                        readEnrollment(limit:${limit}, input: {
                            EL_ID: ${input.EL_ID}
                        }) {
                            edges {
                                EL_ID
                                ST
                                CONST_ID
                                APL_ID
                                CPAN
                                PROD
                                EE_ID
                                GIFT_AMT
                                DATE
                            }
                            totalCount
                        }
                    }
                `,
            });
        }
        
    }

    create(input) {
        return this._client
            .query({
                query: gql`
                    query {
                        createEnrollment(input: {
                            DATE: ${input.DATE}
                            WRTR_ID: ${input.WRTR_ID}
                            ${input.CONST_ID ? `CONST_ID: ${input.CONST_ID}` : ''}
                            ${input.EE_ID ? `EE_ID: ${input.EE_ID}` : ''}
                            ${input.APL_ID ? `APL_ID: ${input.APL_ID}` : ''}
                            ${input.CPAN ? `CPAN: ${input.CPAN}` : ''}
                            ${input.PROD ? `PROD: ${input.PROD}` : ''}
                            ${input.ST ? `ST: ${input.ST}` : ''}
                            ${input.GIFT_AMT ? `GIFT_AMT: ${input.GIFT_AMT}` : ''}
                        }) {
                            EL_ID
                        }
                    }
                `,
            }); 
    }
}

export default new EnrollmentService();