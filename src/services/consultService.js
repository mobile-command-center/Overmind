import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class ConsultService {
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
                    getConsultation(input : {
                        CONST_ID: ${input.CONST_ID}
                    }) {
                        CONST_ID
                        WRTR_ID
                        DATE_REG
                        DATE_MDF
                        DATE_INSTALL
                        C_TEL
                        P_SUBSIDY_AMT
                        AVAL_INQUIRY_PASS
                        PPSTY
                        ST
                        REC_TEL
                        MEMO
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
                    readConsultation(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                    }) {
                        edges {
                            CONST_ID
                            WRTR_ID
                            DATE_REG
                            DATE_MDF
                            DATE_INSTALL
                            C_TEL
                            P_SUBSIDY_AMT
                            AVAL_INQUIRY_PASS
                            PPSTY
                            ST
                            REC_TEL
                            MEMO
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
                    searchConsultation(input:{
                        ${input.first ? `first: ${input.first}`: ''}
                        ${input.last ? `last: ${input.last}`: ''}
                        ${input.before ? `before: ${input.before}`: ''}
                        ${input.after ? `after: ${input.after}`: ''}
                        ${input.filter ? `filter: {
                            ${input.filter.WRTR_ID ? `WRTR_ID: {
                                contains: "${input.filter.WRTR_ID.contains}"
                            }`: ''}
                            ${input.filter.DATE_REG ? `DATE_REG: {
                                contains: "${input.filter.DATE_REG.contains}"
                            }`: ''}
                            ${input.filter.DATE_MDF ? `DATE_MDF: {
                                contains: "${input.filter.DATE_MDF.contains}"
                            }`: ''}
                            ${input.filter.DATE_INSTALL ? `DATE_INSTALL: {
                                contains: "${input.filter.DATE_INSTALL.contains}"
                            }`: ''}
                            ${input.filter.C_TEL ? `C_TEL: {
                                    contains: "${input.filter.C_TEL.contains}"
                            }`: ''}
                            ${input.filter.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT : {
                                    contains: "${input.filter.P_SUBSIDY_AMT.contains}"
                            }`: ''}
                            ${input.filter.PPSTY ? `PPSTY : {
                                contains: "${input.filter.PPSTY.contains}"
                            }`: ''}
                            ${input.filter.ST ? `ST : {
                                contains: "${input.filter.ST.contains}"
                            }`: ''}
                            ${input.filter.REC_TEL ? `REC_TEL: {
                                contains: "${input.filter.REC_TEL.contains}"
                            }`: ''}
                            ${input.filter.MEMO ? `MEMO: {
                                contains: "${input.filter.MEMO.contains}"
                            }`: ''}
                        }`: ''}
                    }) {
                        edges {
                            CONST_ID
                            WRTR_ID
                            DATE_REG
                            DATE_MDF
                            DATE_INSTALL
                            C_TEL
                            P_SUBSIDY_AMT
                            AVAL_INQUIRY_PASS
                            PPSTY
                            ST
                            REC_TEL
                            MEMO
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
                        createConsultation(input: {
                            WRTR_ID: ${`"${input.WRTR_ID}"`}
                            ${input.C_TEL ? `C_TEL: ${`"${input.C_TEL}"`}`: ''}
                            ${input.DATE_INSTALL ? `DATE_INSTALL: ${`"${input.DATE_INSTALL}"`}`: ''}
                            ${input.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT: ${`"${input.P_SUBSIDY_AMT}"`}`: ''}
                            AVAL_INQUIRY_PASS: ${String(input.AVAL_INQUIRY_PASS)}
                            ${input.PPSTY ? `PPSTY: ${`"${input.PPSTY}"`}`: ''}
                            ${input.ST ? `ST: ${`"${input.ST}"`}`: ''}
                            ${input.REC_TEL ? `REC_TEL: ${`"${input.REC_TEL}"`}`: ''}
                            ${input.MEMO ? `MEMO: ${`"${input.MEMO.replace(/\n/g, '\\n')}"`}`: ''}
                        }) {
                            CONST_ID
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
                    updateConsultation(input: {
                        CONST_ID: ${input.CONST_ID}
                        ${input.WRTR_ID ? `WRTR_ID: ${`"${input.WRTR_ID}"`}`: ''}
                        ${input.C_TEL ? `C_TEL: ${`"${input.C_TEL}"`}`: ''}
                        ${input.DATE_INSTALL ? `DATE_INSTALL: ${`"${input.DATE_INSTALL}"`}`: ''}
                        ${input.P_SUBSIDY_AMT ? `P_SUBSIDY_AMT: ${`"${input.P_SUBSIDY_AMT}"`}`: ''}
                        ${typeof input.AVAL_INQUIRY_PASS !== 'undefined' ? `AVAL_INQUIRY_PASS: ${input.AVAL_INQUIRY_PASS}`:''}
                        ${input.PPSTY ? `PPSTY: ${`"${input.PPSTY}"`}`: ''}
                        ${input.ST ? `ST: ${`"${input.ST}"`}`: ''}
                        ${input.REC_TEL ? `REC_TEL: ${`"${input.REC_TEL}"`}`: ''}
                        ${input.MEMO ? `MEMO: ${`"${input.MEMO.replace(/\n/g, '\\n')}"`}`: ''}
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
                        CONST_ID: ${input.CONST_ID}
                    }) {
                        CONST_ID
                    }
                }
            `
        }); 
    }
}

export default new ConsultService();