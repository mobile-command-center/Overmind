import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class PayService {
    constructor() {
        this._client = new ApolloClient({
            uri: 'https://3bs9wim5w1.execute-api.ap-northeast-2.amazonaws.com/dev/v1/graphql'
        });
    }

    get(input) {
        return this._client
        .query({
            query: gql`
                query {
                    getPayment(input : {
                        PYMT_ID: ${input.PYMT_ID}
                    }) {
                        PYMT_ID
                        SCHE_DATE
                        COMP_DATE
                        EE_ID
                        PAY_TYPE
                        PAY_AMT
                        WRTR_ID
                        WRT_DATE
                        ST
                        EL_ID
                    }
                }
            `,
        });
    }

    read(input) {
        return this._client
        .query({
            query: gql`
                query {
                    readPayment(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                    }) {
                        edges {
                            PYMT_ID
                            SCHE_DATE
                            COMP_DATE
                            EE_ID
                            PAY_TYPE
                            PAY_AMT
                            WRTR_ID
                            WRT_DATE
                            ST
                            EL_ID
                        }
                        totalCount
                        pageInfo {
                            endCursor
                            startCursor
                        }
                    }
                }
            `,
        });
    }

    search(input) {
        return this._client
            .query({
                query: gql`
                query {
                    searchPayment(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                        ${input.filter ? `filter: {
                            ${input.filter.DATE ? `DATE: {
                                    contains: "${input.filter.DATE.contains}"
                            }`: ''}
                            ${input.filter.EE_ID ? `EE_ID: {
                                    contains: "${input.filter.EE_ID.contains}"
                            }`: ''}
                            ${input.filter.PAY_TYPE ? `PAY_TYPE: {
                                    contains: "${input.filter.PAY_TYPE.contains}"
                            }`: ''}
                            ${input.filter.PAY_AMT ? `PAY_AMT: {
                                    contains: "${input.filter.PAY_AMT.contains}"
                            }`: ''}
                            ${input.filter.ST ? `ST : {
                                    contains: "${input.filter.ST.contains}"
                            }`: ''}
                        }`: ''}
                    }) {
                        edges {
                            PYMT_ID
                            SCHE_DATE
                            COMP_DATE
                            EE_ID
                            PAY_TYPE
                            PAY_AMT
                            WRTR_ID
                            WRT_DATE
                            ST
                            EL_ID
                        }
                        totalCount
                        pageInfo {
                            endCursor
                            startCursor
                        }
                    }
                }
            `,
        });
    }

    create(input) {
        return this._client
            .mutate({
                mutation: gql`
                    mutation {
                        createPayment(input: {
                            WRTR_ID: ${`"${input.WRTR_ID}"`}
                            ${input.SCHE_DATE ? `SCHE_DATE: ${`"${input.SCHE_DATE}"`}`: ''}
                            ${input.COMP_DATE ? `COMP_DATE: ${`"${input.COMP_DATE}"`}`: ''}
                            ${input.EE_ID ? `EE_ID: ${`"${input.EE_ID}"`}`: ''}
                            ${input.PAY_TYPE ? `PAY_TYPE: ${`"${input.PAY_TYPE}"`}`: ''}
                            ${input.PAY_AMT ? `PAY_AMT: ${`"${input.PAY_AMT}"`}`: ''}
                            ${input.ST ? `ST: ${`"${input.ST}"`}`: ''}
                            ${input.EL_ID ? `EL_ID: ${input.EL_ID}`: ''}
                        }) {
                            PYMT_ID
                        }
                    }
                `
            }); 
    };

    update(input) {
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    updatePayment(input: {
                        PYMT_ID: ${input.PYMT_ID}
                        ${input.SCHE_DATE ? `SCHE_DATE: ${`"${input.SCHE_DATE}"`}`: ''}
                        ${input.COMP_DATE ? `COMP_DATE: ${`"${input.COMP_DATE}"`}`: ''}
                        ${input.EE_ID ? `EE_ID: ${`"${input.EE_ID}"`}`: ''}
                        ${input.WRTR_ID ? `WRTR_ID: ${`"${input.WRTR_ID}"`}`: ''}
                        ${input.PAY_TYPE ? `PAY_TYPE: ${`"${input.PAY_TYPE}"`}`: ''}
                        ${input.PAY_AMT ? `PAY_AMT: ${`"${input.PAY_AMT}"`}`: ''}
                        ${input.ST ? `ST: ${`"${input.ST}"`}`: ''}
                        ${input.EL_ID ? `EL_ID: ${input.EL_ID}`: ''}
                    }) {
                        PYMT_ID
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
                    deletePayment(input: {
                        PYMT_ID: ${input.PYMT_ID}
                    }) {
                        PYMT_ID
                    }
                }
            `
        }); 
    }
}

export default new PayService();