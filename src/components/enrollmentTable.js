import React, { Component } from 'react';

const styles = {
    table : {
        width: '100%'
    }
};

export default class EnrollmentTable extends Component {
    render() {
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">how_to_reg</i>
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
                                                <th>접수 ID</th>
                                                <th>접수자 ID</th>
                                                <th>상태</th>
                                                <th>상담 ID</th>
                                                <th>신청서ID</th>
                                                <th>접수 회사</th>
                                                <th>접수 상품</th>
                                                
                                                <th>접수 시간</th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                <th>접수 ID</th>
                                                <th>접수자 ID</th>
                                                <th>상태</th>
                                                <th>상담 ID</th>
                                                <th>신청서ID</th>
                                                <th>접수 회사</th>
                                                <th>접수 상품</th>
                                                <th>접수 시간</th>
                                                <th className="text-right">Actions</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                <td>80a74970-6e7d-434d-90e0-e14d893a7c1f</td>
                                                <td>myraous</td>
                                                <td>확인</td>
                                                <td>80a74970-6e7d-434d-90e0-e14d893a7c1f</td>
                                                <td>80a74970-6e7d-434d-90e0-e14d893a7c1f</td>
                                                <td>접수회사</td>
                                                <td>SKB</td>
                                                <td>2019-09-20 13:53:20</td>
                                                <td className="text-right">
                                                    <a href="#12" className="btn btn-link btn-warning btn-just-icon edit"><i className="material-icons">dvr</i></a>
                                                    <a href="#34" className="btn btn-link btn-danger btn-just-icon remove"><i className="material-icons">close</i></a>
                                                </td>
                                                </tr>
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