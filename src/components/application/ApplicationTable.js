import React, { Component } from 'react';

export default class ApplicationTable extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header card-header-text card-header-warning">
                    <div className="card-text">
                        <h4 className="card-title">신청서 ID 조회</h4>
                        <p className="card-category">New employees on 15th September, 2016</p>
                    </div>
                </div>
                <div className="card-body table-responsive">
                    <div class="row">
                        <div class="col-sm-4 col-md-4 ml-auto">
                            <div id="datatables_filter" class="dataTables_filter">
                                <label>
                                    <span class="bmd-form-group bmd-form-group-sm is-filled">
                                        <input type="search" class="form-control form-control-sm" placeholder="Search records" aria-controls="datatables"/>
                                    </span>
                                    
                                </label>
                            </div>
                        </div>
                        {/* <div className="col-sm-2">
                            <button type="button" className="btn btn-rose btn-sm btn-round">
                                <i className="material-icons">search</i>
                                찾기
                            </button>
                        </div> */}
                    </div>
                    <table className="table table-hover">
                        <thead className="text-warning">
                            <th>신청서 ID</th>
                            <th>Name</th>
                            <th>Salary</th>
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