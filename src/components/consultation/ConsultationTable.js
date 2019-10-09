import React, { Component } from 'react';
import Swal from 'sweetalert2'
import moment from 'moment';
import ConsultService from '../../services/consultService';
import consultService from '../../services/consultService';
import LoadingSpinner from '../common/LoadingSpinner';

const styles = {
    table: {
        width: '100%'
    }
};

export default class ConsultationTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            edges: [],
            pageInfo: {
                endCursor: null,
                startCursor: null,
                hasPreviousPage: false
            },
            loading: true,
            searchText: this.props.searchText || '',
        }
    }

    componentDidMount() {
        if(!!this.state.searchText) {
            consultService.search({
                first: this.state.limit,
                filter: {
                    DATE: {
                        contains: this.state.searchText
                    },
                    WRT_DATE: {
                        contains: this.state.searchText
                    },
                    EE_ID: {
                        contains: this.state.searchText
                    },
                    C_TEL: {
                        contains: this.state.searchText
                    },
                    MEMO: {
                        contains: this.state.searchText
                    },
                    P_SUBSIDY_AMT: {
                        contains: this.state.searchText
                    },
                }
            })
            .then(({ data: { searchConsultation: ConsultationConnection } }) => {
                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                    loading: false
                });
            }, (err) => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 검색을 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            });
        } else {
            ConsultService.read({
                first: this.state.limit
            })
            .then(({ data: { readConsultation: ConsultationConnection } }) => {
                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                    loading: false
                });
            }, () => {
                this.setState({
                    loading: false
                });
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 조회를 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            });
        }
    }

    renderItems = () => {
        return this.state.edges.map((Consultation) => (
            <tr key={Consultation.CONST_ID} onClick={this.onClickCHandler} data-id={Consultation.CONST_ID}>
                <td className="text-center">{Consultation.CONST_ID}</td>
                <td>{Consultation.C_TEL || '미등록'}</td>
                <td>{Consultation.P_SUBSIDY_AMT || '미등록'}</td>
                <td>{Consultation.EE_ID || '미등록'}</td>
                <td>{Consultation.MEMO || '미등록'}</td>
                <td>{moment(Consultation.DATE).format("YYYY/MM/DD h:mm A") || '미등록'}</td>
                <td className="text-right">
                    <a href="#12" className="btn btn-link btn-warning btn-just-icon edit"><i className="material-icons" data-action="onEdit">edit</i></a>
                    <a href="#34" className="btn btn-link btn-danger btn-just-icon remove"><i className="material-icons" data-action="onDelete">delete</i></a>
                </td>
            </tr>
        ));
    }

    onChangeHandler = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    onKeyDownHandler = (e) => {
        if(e.keyCode === 13) {
            this.onSearch();
        }
    }

    onClickCHandler = (e) => {
        e.preventDefault();

        const elemTarget = e.target;
        const CONST_ID = e.currentTarget.dataset.id;
        if (elemTarget && elemTarget.dataset.action === 'onEdit') {
            window.location.href = `../consultation/edit/${CONST_ID}`;
        } else if (elemTarget && elemTarget.dataset.action === 'onDelete') {
            this.onDelete(CONST_ID);
        } else if (elemTarget && elemTarget.dataset.action === 'onPrevPage') {
            this.onPrevPage();
        } else if (elemTarget && elemTarget.dataset.action === 'onNextPage') {
            this.onNextPage();
        } else if (elemTarget && elemTarget.dataset.action === 'onSearch') {
            this.onSearch();
        }
    }

    onSearch = (e) => {
        window.location.href = `/consultation/search/${this.state.searchText}`;
    }

    onPrevPage = (e) => {
        const startCursor = this.state.pageInfo.startCursor;

        if(!!this.state.searchText) {
            consultService.search({
                first: this.state.limit,
                filter: {
                    DATE: {
                        contains: this.state.searchText
                    },
                    WRT_DATE: {
                        contains: this.state.searchText
                    },
                    EE_ID: {
                        contains: this.state.searchText
                    },
                    C_TEL: {
                        contains: this.state.searchText
                    },
                    MEMO: {
                        contains: this.state.searchText
                    },
                    P_SUBSIDY_AMT: {
                        contains: this.state.searchText
                    },
                }
            })
            .then(({ data: { searchConsultation: ConsultationConnection } }) => {
                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                    loading: false
                });
            }, (err) => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 검색을 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            });
        } else {
            consultService.read({
                last: this.state.limit,
                before: startCursor
            }).then(({ data: { readConsultation: ConsultationConnection } }) => {
                if(ConsultationConnection.edges.length < 1) {
                    return Swal.fire({
                        title: '에러!',
                        text: '처음 페이지 입니다.',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success',
                        type: 'error'
                    });
                }
    
                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                    loading: true
                });
            }, (err) => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 조회를 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            }).finally(() => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    onNextPage = () => {
        const endCursor = this.state.pageInfo.endCursor;

        if(this.state.edges.length < this.state.limit) {
            return Swal.fire({
                title: '에러!',
                text: '마지막 페이지 입니다.',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success',
                type: 'error'
            });
        }

        this.setState({
            loading: true
        });

        if(!!this.state.searchText) {
            consultService.search({
                first: this.state.limit,
                after: endCursor,
                filter: {
                    DATE: {
                        contains: this.state.searchText
                    },
                    WRT_DATE: {
                        contains: this.state.searchText
                    },
                    EE_ID: {
                        contains: this.state.searchText
                    },
                    C_TEL: {
                        contains: this.state.searchText
                    },
                    MEMO: {
                        contains: this.state.searchText
                    },
                    P_SUBSIDY_AMT: {
                        contains: this.state.searchText
                    },
                }
            })
            .then(({ data: { searchConsultation: ConsultationConnection } }) => {
                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                    loading: false
                });
            }, (err) => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 검색을 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            });
        } else {
            consultService.read({
                first: this.state.limit,
                after: endCursor
            }).then(({ data: { readConsultation: ConsultationConnection } }) => {
                if(ConsultationConnection.edges.length < 1) {

                    return Swal.fire({
                        title: '에러!',
                        text: '마지막 페이지 입니다.',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success',
                        type: 'error'
                    });
                }

                this.setState({
                    edges: ConsultationConnection.edges,
                    pageInfo: ConsultationConnection.pageInfo,
                    limit: this.state.limit,
                });
            }, (err) => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 조회를 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
            }).finally(() => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    onDelete = (CONST_ID) => {
        Swal.queue([{
            title: '삭제하시겠습니까?',
            confirmButtonText: '예, 삭제하겠습니다.',
            cancelButtonText: '아니오',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            text: '한 번 삭제 하시면 복구하실 수 없습니다.',
            showLoaderOnConfirm: true,
            type: 'warning',
            preConfirm: () => {
                return ConsultService.delete({
                    CONST_ID
                }).then(({ data: { deleteConsultation: { CONST_ID } } }) => {
                    Swal.insertQueueStep({
                        title: '성공!',
                        text: `상담 ID: ${CONST_ID}가 삭제되었습니다.`,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success',
                        type: 'success',
                        preConfirm: () => {
                            window.location.reload();
                        }
                    });
                }, (error) => {
                    Swal.insertQueueStep({
                        title: '에러!',
                        text: '상담 정보 삭제가 실패 하였습니다.',
                        type: 'error',
                    });
                })
            }
        }]);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        {this.state.loading ? <LoadingSpinner></LoadingSpinner>:null}
                        <div className="card">
                            <div className="card-header card-header-rose card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">call</i>
                                </div>
                                <h4 className="card-title">상담 내역</h4>
                            </div>
                            <div className="card-body">
                                <div className="material-datatables">
                                    <div className="dataTables_wrapper dt-bootstrap4">
                                        <div className="row">
                                            {/* <div className="col-sm-12 col-md-6">
                                                <div className="dataTables_length" id="datatables_length">
                                                    <label>
                                                        Show 
                                                        <select name="datatables_length" aria-controls="datatables" className="custom-select custom-select-sm form-control form-control-sm">
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="-1">All</option>
                                                        </select>
                                                        entries
                                                    </label>
                                                </div>
                                            </div> */}
                                            <div className="col-sm-12 col-md-6 ml-auto">
                                                <div id="datatables_filter" className="dataTables_filter">
                                                    <label>
                                                        <span className="bmd-form-group bmd-form-group-sm">
                                                            <input type="search" className="form-control form-control-sm" placeholder="Search records" aria-controls="datatables" value={this.state.searchText} onChange={this.onChangeHandler} onKeyDown={this.onKeyDownHandler}/>
                                                            <a href="#34" className="btn btn-rose btn-link btn-just-icon" onClick={this.onClickCHandler} ><i className="material-icons" data-action="onSearch">search</i></a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">상담 ID</th>
                                                        <th>고객 전화 번호</th>
                                                        <th>후기 지급 금액</th>
                                                        <th>상담 직원 ID</th>
                                                        <th>상담 내용</th>
                                                        <th>상담 시간</th>
                                                        <th className="disabled-sorting text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th className="text-center">CONST_ID</th>
                                                        <th>C_TEL</th>
                                                        <th>P_SUBSIDY_AMT</th>
                                                        <th>EE_ID</th>
                                                        <th>MEMO</th>
                                                        <th>DATE</th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {this.renderItems()}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                        <div className="col-sm-12 col-md-1 ml-auto">
                                            <div className="dataTables_paginate paging_full_numbers" onClick={this.onClickCHandler}>
                                                <ul className="pagination">
                                                    <li className="paginate_button page-item previous">
                                                        <a href="#Prev" aria-controls="datatables" className="page-link" data-action="onPrevPage">
                                                            Prev
                                                        </a>
                                                    </li>
                                                    <li className="paginate_button page-item next">
                                                        <a href="#Next" aria-controls="datatables" className="page-link" data-action="onNextPage">
                                                            Next
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}