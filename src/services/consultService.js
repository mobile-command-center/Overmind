import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class ConsultService {
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
                        readConsultation(limit:${limit}, input: {
                            EL_ID: ${input.CONST_ID}
                        }) {
                            edges {
                                CONST_ID
                            }
                            totalCount
                        }
                    }
                `,
            });
        } else {
            return this._client
            .query({
                query: gql`
                    query {
                        readConsultation(limit:${limit}) {
                            edges {
                                CONST_ID
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
            .mutate({
                mutation: gql`
                    mutation {
                        createConsultation(input: {
                            WRTR_ID: ${`"${input.WRTR_ID}"`}
                            DATE: ${`"${input.DATE}"`}
                            ${input.EE_ID ? `EE_ID: ${`"${input.EE_ID}"`}`: ''}
                            ${input.C_TELL ? `C_TELL: ${`"${input.C_TELL}"`}`: ''}
                            ${input.MEMO ? `MEMO: ${`"${input.MEMO}"`}`: ''}
                            ${input.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT: ${`"${input.P_SUBSIDY_AMT}"`}`: ''}
                        }) {
                            CONST_ID
                        }
                    }
                `
            }); 

    }
}

export default new ConsultService();