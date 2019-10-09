import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class ApplicationService {
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
                    getApplication(input : {
                        APL_ID: ${input.APL_ID}
                    }) {
                        APL_ID
                        FRM_DATA
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
                    readApplication(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                    }) {
                        edges {
                            APL_ID
                            FRM_DATA
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
                    searchApplication(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                        ${input.filter ? `filter: {
                            ${input.filter.FRM_DATA ? `FRM_DATA: {
                                    contains: "${input.filter.FRM_DATA.contains}"
                            }`: ''}
                        }`: ''}
                    }) {
                        edges {
                            APL_ID
                            FRM_DATA
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

    delete(input) {
        return this._client
        .mutate({
            mutation: gql`
                mutation {
                    deleteApplication(input: {
                        APL_ID: ${input.APL_ID}
                    }) {
                        APL_ID
                    }
                }
            `
        }); 
    }
}

export default new ApplicationService();