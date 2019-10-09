import React, { Component } from 'react';
import Swal from 'sweetalert2'
import EnrollService from '../services/enrollService';

const styles = {
    table : {
        width: '100%'
    }
};

export default class EnrollmentTable extends Component {
    state = {
        limit: 10,
        items: []
    }

    componentDidMount() {
        EnrollService.read(this.state.limit)
            .then(({data: { readEnrollment: EnrollmentConnection}}) => {
                this.setState({
                    items: EnrollmentConnection.edges
                });
            }, () => {
                console.log('에러다');
            });
    }

    renderItems = () => {
        return this.state.items.map((Enrollment) => (
            <tr key={Enrollment.EL_ID}>
                <td className="text-center">{Enrollment.EL_ID}</td>
                <td>{Enrollment.ST || '미등록'}</td>
                <td>{Enrollment.CONST_ID || '미등록'}</td>
                <td>{Enrollment.APL_ID || '미등록'}</td>
                <td>{Enrollment.CPAN || '미등록'}</td>
                <td>{Enrollment.PROD || '미등록'}</td>
                <td>{Enrollment.EE_ID || '미등록'}</td>
                <td>{Enrollment.DATE || '미등록'}</td>
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
                                    <h4 className="card-title">Enrollment</h4>
                                </div>
                                <div className="card-body">
                                    <div className="toolbar">
                                    </div>
                                    <div className="material-datatables">
                                        <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={styles.table}>
                                            <thead>
                                                <tr>
                                                <th className="text-center">접수 ID</th>
                                                <th>상태</th>
                                                <th>상담 내역</th>
                                                <th>신청서</th>
                                                <th>접수 회사</th>
                                                <th>접수 상품</th>
                                                <th>접수자 ID</th>
                                                <th>접수 시간</th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                <th className="text-center">EL_ID</th>
                                                <th>ST</th>
                                                <th>CONST_ID</th>
                                                <th>APL_ID</th>
                                                <th>CPAN</th>
                                                <th>PROD</th>
                                                <th>EE_ID</th>
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