import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class MemoService {
    constructor() {
        this._client = new ApolloClient({
            // uri: 'https://4uecyvfodh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/graphql' //DEV 환경용
            uri: 'https://4rtponga6g.execute-api.ap-northeast-2.amazonaws.com/real/v1/graphql'
        });
    }

    get(input) {
        return this._client
        .query({
            query: gql`
                query {
                    getMemo(input : {
                        MEMO_ID: ${input.MEMO_ID}
                    }) {
                        MEMO_ID
                        WRTR_ID
                        DATE_MEMO
                        CONTENT
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
                    readMemo(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                    }) {
                        edges {
                            MEMO_ID
                            WRTR_ID
                            DATE_MEMO
                            CONTENT
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
                    searchMemo(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                        ${input.filter ? `filter: {
                            ${input.filter.CONST_ID ? `CONST_ID: {
                                eq: ${input.filter.CONST_ID.eq}
                            }`: ''}
                            ${input.filter.DATE_REG ? `DATE_REG: {
                                    contains: "${input.filter.DATE_REG.contains}"
                            }`: ''}
                            ${input.filter.DATE_MDF ? `DATE_MDF: {
                                contains: "${input.filter.DATE_MDF.contains}"
                            }`: ''}
                            ${input.filter.DATE_MEMO ? `DATE_MEMO: {
                                    contains: "${input.filter.DATE_MEMO.contains}"
                            }`: ''}
                            ${input.filter.CONTENT ? `CONTENT : {
                                contains: "${input.filter.CONTENT.contains}"
                            }`: ''}
                        }`: ''}
                    }) {
                        edges {
                            MEMO_ID
                            WRTR_ID
                            DATE_MEMO
                            CONTENT
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
                        createMemo(input: {
                            WRTR_ID: ${`"${input.WRTR_ID}"`}
                            CONST_ID: ${input.CONST_ID}
                            ${input.DATE_MEMO ? `DATE_MEMO: ${`"${input.DATE_MEMO}"`}`: ''}
                            ${input.CONTENT ? `CONTENT: ${`"${input.CONTENT.replace(/\n/g, '\\n')}"`}`: ''}
                        }) {
                            MEMO_ID
                        }
                    }
                `
            }); 
    }

    update(input) {
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    updateMemo(input: {
                        MEMO_ID: ${input.MEMO_ID}
                        ${input.WRTR_ID ? `WRTR_ID: ${`"${input.WRTR_ID}"`}`: ''}
                        ${input.DATE_MEMO ? `DATE_MEMO: ${`"${input.DATE_MEMO}"`}`: ''}
                        ${input.CONTENT ? `CONTENT: ${`"${input.CONTENT.replace(/\n/g, '\\n')}"`}`: ''}
                    }) {
                        MEMO_ID
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
                    deleteMemo(input: {
                        MEMO_ID: ${input.MEMO_ID}
                    }) {
                        MEMO_ID
                    }
                }
            `
        }); 
    }
}

export default new MemoService();