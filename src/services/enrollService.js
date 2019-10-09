import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class EnrollmentService {
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
                    getEnrollment(input : {
                        EL_ID: ${input.EL_ID}
                    }) {
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
                }
            `,
        });
    }

    read(input) {
        return this._client
        .query({
            query: gql`
                query {
                    readEnrollment(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
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
                    searchEnrollment(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                        ${input.filter ? `filter: {
                            ${input.filter.ST ? `ST: {
                                    contains: "${input.filter.ST.contains}"
                            }`: ''}
                            ${input.filter.CPAN ? `CPAN : {
                                    contains: "${input.filter.CPAN.contains}"
                            }`: ''}
                            ${input.filter.PROD ? `PROD : {
                                contains: "${input.filter.PROD.contains}"
                            }`: ''}
                            ${input.filter.EE_ID ? `EE_ID : {
                                contains: "${input.filter.EE_ID.contains}"
                            }`: ''}
                            ${input.filter.GIFT_AMT ? `GIFT_AMT : {
                                contains: "${input.filter.GIFT_AMT.contains}"
                            }`: ''}
                        }`: ''}
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
                        createEnrollment(input: {
                            DATE: "${input.DATE}"
                            WRTR_ID: "${input.WRTR_ID}"
                            ${input.ST ? `ST: "${input.ST}"` : ''}
                            ${input.CONST_ID ? `CONST_ID: ${input.CONST_ID}` : ''}
                            ${input.APL_ID ? `APL_ID: ${input.APL_ID}` : ''}
                            ${input.CPAN ? `CPAN: "${input.CPAN}"` : ''}
                            ${input.PROD ? `PROD: "${input.PROD}"` : ''}
                            ${input.EE_ID ? `EE_ID: "${input.EE_ID}"` : ''}
                            ${input.GIFT_AMT ? `GIFT_AMT: "${input.GIFT_AMT}"` : ''}
                        }) {
                            EL_ID
                        }
                    }
                `,
            }); 
    }

    update(input) {
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    updateEnrollment(input: {
                        EL_ID: ${input.EL_ID}
                        WRTR_ID: "${input.WRTR_ID}"
                        ${input.ST ? `ST: "${input.ST}"` : ''}
                        ${input.CONST_ID ? `CONST_ID: ${input.CONST_ID}` : ''}
                        ${input.APL_ID ? `APL_ID: ${input.APL_ID}` : ''}
                        ${input.CPAN ? `CPAN: "${input.CPAN}"` : ''}
                        ${input.PROD ? `PROD: "${input.PROD}"` : ''}
                        ${input.EE_ID ? `EE_ID: "${input.EE_ID}"` : ''}
                        ${input.GIFT_AMT ? `GIFT_AMT: "${input.GIFT_AMT}"` : ''}
                    }) {
                        EL_ID
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
                    deleteEnrollment(input: {
                        EL_ID: ${input.EL_ID}
                    }) {
                        EL_ID
                    }
                }
            `
        }); 
    }
}

export default new EnrollmentService();