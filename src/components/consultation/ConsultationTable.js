import React, { Component } from 'react';
import Swal from 'sweetalert2'
import moment from 'moment';
import ConsultService from '../../services/consultService';

const styles = {
    table: {
        width: '100%'
    }
};

export default class ConsultationTable extends Component {
    state = {
        limit: 10,
        items: []
    }

    componentDidMount() {
        ConsultService.read(this.state.limit)
            .then(({ data: { readConsultation: ConsultationConnection } }) => {
                debugger;
                this.setState({
                    items: ConsultationConnection.edges
                });
            }, () => {
                console.log('에러다');
            });
    }

    renderItems = () => {
        return this.state.items.map((Consultation) => (
            <tr key={Consultation.CONST_ID} onClick={this.onClickCHandler} data-id={Consultation.CONST_ID}>
                <td className="text-center">{Consultation.CONST_ID}</td>
                <td>{Consultation.C_TEL || '미등록'}</td>
                <td>{Consultation.P_SUBSIDY_AMT || '미등록'}</td>
                <td>{Consultation.EE_ID || '미등록'}</td>
                <td>{Consultation.MEMO || '미등록'}</td>
                <td>{moment(Consultation.DATE).utc().format("YYYY/MM/DD h:mm A") || '미등록'}</td>
                <td className="text-right">
                    <a href="#12" className="btn btn-link btn-warning btn-just-icon edit"><i className="material-icons" data-action="onEdit">edit</i></a>
                    <a href="#34" className="btn btn-link btn-danger btn-just-icon remove"><i className="material-icons" data-action="onDelete">delete</i></a>
                </td>
            </tr>
        ));
    }

    onClickCHandler = (e) => {
        const elemTarget = e.target;
        const CONST_ID = e.currentTarget.dataset.id;
        if (elemTarget && elemTarget.dataset.action === 'onEdit') {
            window.location.href = `../consultation/edit/${CONST_ID}`;
        } else if (elemTarget && elemTarget.dataset.action === 'onDelete') {
            this.onDelete(CONST_ID);
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
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">content_paste</i>
                                    </div>
                                    <h4 className="card-title">Consultation</h4>
                                </div>
                                <div className="card-body">
                                    <div className="toolbar">
                                    </div>
                                    <div className="material-datatables">
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
                                            <div className="col-sm-12 col-md-3">
                                                <div className="dataTables_info" role="status" aria-live="polite">
                                                    Showing 31 to 40 of 40 entries
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-2 ml-auto">
                                                <div className="dataTables_paginate paging_full_numbers">
                                                    <ul className="pagination">
                                                        <li className="paginate_button page-item previous">
                                                            <a href="#Prev" aria-controls="datatables" data-dt-idx="1" tabIndex="0" className="page-link">
                                                                Prev
                                                            </a>
                                                        </li>
                                                        <li className="paginate_button page-item ">
                                                            <a href="#1" aria-controls="datatables" data-dt-idx="2" tabIndex="0" className="page-link">
                                                                1
                                                            </a>
                                                        </li>
                                                        <li className="paginate_button page-item ">
                                                            <a href="#2" aria-controls="datatables" data-dt-idx="3" tabIndex="0" className="page-link">
                                                                2</a>
                                                        </li>
                                                        <li className="paginate_button page-item ">
                                                            <a href="#3" aria-controls="datatables" data-dt-idx="4" tabIndex="0" className="page-link">
                                                                3
                                                            </a>
                                                        </li>
                                                        <li className="paginate_button page-item active">
                                                            <a href="#4" aria-controls="datatables" data-dt-idx="5" tabIndex="0" className="page-link">
                                                                4
                                                            </a>
                                                        </li>
                                                        <li className="paginate_button page-item next disabled">
                                                            <a href="#Next" aria-controls="datatables" data-dt-idx="6" tabIndex="0" className="page-link">
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