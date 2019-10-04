import React, { Component } from 'react';

export default class ConsultationSearchWidget extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header card-header-text card-header-warning">
                    <div className="card-text">
                        <h4 className="card-title">상담 내역 조회</h4>
                    </div>
                </div>
                <div className="card-body table-responsive">
                    <div class="row">
                        <div className="col-sm-5 col-md-6 checkbox-radios">
                            <label className="col-form-label label-checkbox">검색조건</label>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="radio" name="ST" value="READY" checked={true} onChange={this._onChangedRadio}/> 고객명
                                    <span className="circle">
                                        <span className="check"></span>
                                    </span>
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="radio" name="ST" value="CHECK" checked={false} onChange={this._onChangedRadio}/> 전화번호
                                    <span className="circle">
                                        <span className="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 col-md-4 ml-auto">
                            <div id="datatables_filter" class="dataTables_filter">
                                <label>
                                    <span class="bmd-form-group bmd-form-group-sm is-filled">
                                        <input type="search" class="form-control form-control-sm" placeholder="Search records" aria-controls="datatables"/>
                                    </span>
                                    
                                </label>
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead className="text-warning">
                            <th>상담 ID</th>
                            <th>고객명</th>
                            <th>전화번호</th>
                            <th>Country</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Philip Chaney</td>
                                <td>$38,735</td>
                                <td>Korea, South</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}