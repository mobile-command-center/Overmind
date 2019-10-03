import React, { Component } from 'react';
import Swal from 'sweetalert2'
import ConsultService from '../../services/consultService';

const styles = {
    table : {
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
            .then(({data: { readConsultation: ConsultationConnection}}) => {
                this.setState({
                    items: ConsultationConnection.edges
                });
            }, () => {
                console.log('에러다');
            });
    }

    renderItems = () => {
        return this.state.items.map((Consultation) => (
            <tr key={Consultation.CONST_ID}>
                <td className="text-center">{Consultation.CONST_ID}</td>
                <td>{Consultation.C_TELL || '미등록'}</td>
                <td>{Consultation.P_SUBSIDY_AMT || '미등록'}</td>
                <td>{Consultation.APL_ID || '미등록'}</td>
                <td>{Consultation.MEMO || '미등록'}</td>
                <td>{Consultation.DATE || '미등록'}</td>
                <td className="text-right">
                    <a href="#12" className="btn btn-link btn-warning btn-just-icon edit"><i className="material-icons">dvr</i></a>
                    <a href="#34" className="btn btn-link btn-danger btn-just-icon remove" onClick={this.onClickClose}><i className="material-icons">close</i></a>
                </td>
            </tr>
        ));
    }

    onClickClose = () => {
        Swal.fire({
            title: '삭제하시겠습니까?',
            text: '한 번 삭제 하시면 복구하실 수 없습니다.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '예, 삭제하겠습니다.',
            cancelButtonText: '아니오',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        });
    }

    render() {
        return(
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
                                                <th>C_TELL</th>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}