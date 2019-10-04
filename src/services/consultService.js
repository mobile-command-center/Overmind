import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class ConsultService {
    constructor() {
        this._client = new ApolloClient({
            uri: 'https://kd579k2xk8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/graphql'
        });
    }

    get(input) {
        return this._client
        .query({
            query: gql`
                query {
                    getConsultation(input : {
                        CONST_ID: ${input.CONST_ID}
                    }) {
                        CONST_ID
                        DATE
                        WRTR_ID
                        WRT_DATE
                        EE_ID
                        C_TEL
                        MEMO
                        P_SUBSIDY_AMT
                    }
                }
            `,
        });
    }

    read(limit, input) {
        if(input) {
            return this._client
            .query({
                query: gql`
                    query {
                        readConsultation(limit:${limit}, input: {
                            CONST_ID: ${input.CONST_ID}
                        }) {
                            edges {
                                CONST_ID
                                DATE
                                WRT_DATE
                                EE_ID
                                C_TEL
                                MEMO
                                P_SUBSIDY_AMT
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
                                DATE
                                WRT_DATE
                                EE_ID
                                C_TEL
                                MEMO
                                P_SUBSIDY_AMT
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
                            ${input.C_TEL ? `C_TEL: ${`"${input.C_TEL}"`}`: ''}
                            ${input.MEMO ? `MEMO: ${`"${input.MEMO}"`}`: ''}
                            ${input.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT: ${`"${input.P_SUBSIDY_AMT}"`}`: ''}
                        }) {
                            CONST_ID
                        }
                    }
                `
            }); 
    }

    update(input) {
        debugger;
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    updateConsultation(input: {
                        CONST_ID: ${`"${input.CONST_ID}"`}
                        ${input.DATE ? `DATE: ${`"${input.DATE}"`}`: ''}
                        ${input.WRTR_ID ? `WRTR_ID: ${`"${input.WRTR_ID}"`}`: ''}
                        ${input.EE_ID ? `EE_ID: ${`"${input.EE_ID}"`}`: ''}
                        ${input.C_TEL ? `C_TEL: ${`"${input.C_TEL}"`}`: ''}
                        ${input.MEMO ? `MEMO: ${`"${input.MEMO}"`}`: ''}
                        ${input.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT: ${`"${input.P_SUBSIDY_AMT}"`}`: ''}
                    }) {
                        CONST_ID
                    }
                }
            `
        }); 
    }

    delete(input) {
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    deleteConsultation(input: {
                        CONST_ID: ${`"${input.CONST_ID}"`}
                    }) {
                        CONST_ID
                    }
                }
            `
        }); 
    }
}

export default new ConsultService();