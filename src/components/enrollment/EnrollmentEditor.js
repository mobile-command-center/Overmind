import React, { Component } from 'react'
import EnrollService from '../../services/enrollService';


export default class EnrollmentEditor extends Component {
    state = {
        item:  {
            EL_ID: '',
            DATE: '',
            WRTR_ID: '', // @TODO 로그인 사용자 ID 자동 입력
            WRT_DATE: '',
            CONST_ID: '',
            EE_ID: '',
            APL_ID: '',
            CPAN: '',
            PROD: '',
            ST: '',
            GIFT_AMT: '',
            F_SUBSIDY_AMT: ''
        }
    }

    constructor(props) {
        super(props);

        const { EL_ID } = this.props;

        if(EL_ID) {
            EnrollService.read(1, {EL_ID: `"${EL_ID}"`})
            .then(({data: { readEnrollment: EnrollmentConnection}}) => {
                this.setState({
                    item: EnrollmentConnection.edges[0]
                });
            }, () => {
                console.log('에러다');
            });
        }
        
    }

    _onChangedRadio = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                ST: e.currentTarget.value
            }
        });
    }

    render() {

        const {
            EL_ID,
            DATE,
            CONST_ID,
            EE_ID,
            APL_ID,
            CPAN,
            PROD,
            ST,
            GIFT_AMT,
            F_SUBSIDY_AMT
        } = this.state.item;

        return(
            <form id="EnrollmentValidation" action="" method="">
                <div className="card ">
                    <div className="card-header card-header-rose card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">mail_outline</i>
                        </div>
                        <h4 className="card-title">접수 작성 폼</h4>
                    </div>
                    <div className="card-body ">
                        <div className="row">
                            <label className="col-sm-3 col-form-label">접수 ID</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="EL_ID" aria-required="true" disabled defaultValue={EL_ID || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">접수 시간</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group is-filled">
                                    <input className="form-control datetimepicker" type="text" name="DATE" required={true} defaultValue={DATE || new Date().toString()}/>
                                    <span className="material-input"></span>
                                    <span className="material-input"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">접수 직원 ID</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="EE_ID" aria-required="true" autoComplete="false" defaultValue={EE_ID || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">상담 ID</label>
                            <div className="col-sm-5 col-md-6">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="CONST_ID"  aria-required="true" autoComplete="false" defaultValue={CONST_ID || ''}/>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-rose btn-sm btn-round">
                                    <i className="material-icons">search</i>
                                    찾기
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">신청서 ID</label>
                            <div className="col-sm-5 col-md-6">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="APL_ID"  aria-required="true" autoComplete="false" defaultValue={APL_ID || ''}/>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-rose btn-sm btn-round">
                                    <i className="material-icons">search</i>
                                    찾기
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">접수 회사</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="CPAN"  aria-required="true" autoComplete="false" defaultValue={CPAN || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">접수 상품</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="PROD"  aria-required="true" autoComplete="false" defaultValue={PROD || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">사은품 지급 금액</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="GIFT_AMT"  aria-required="true" autoComplete="false" defaultValue={GIFT_AMT || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">확정 후기 지급 금액</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <input className="form-control" type="text" name="F_SUBSIDY_AMT"  aria-required="true" autoComplete="false" defaultValue={F_SUBSIDY_AMT || ''}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label label-checkbox">상태</label>
                            <div className="col-sm-8 checkbox-radios">
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="READY" checked={ST === 'READY'} onChange={this._onChangedRadio}/> 준비
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="CHECK" checked={ST === 'CHECK'} onChange={this._onChangedRadio}/> 확인
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="HAPPY" checked={ST === 'HAPPY'} onChange={this._onChangedRadio}/> 해피콜
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="WITHHOLD" checked={ST === 'WITHHOLD'} onChange={this._onChangedRadio}/> 보류
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="COMMAND" checked={ST === 'COMMAND'} onChange={this._onChangedRadio}/> 지시
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="CONFIRM" checked={ST === 'CONFIRM'} onChange={this._onChangedRadio}/> 개통확인
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="radio" name="ST" value="COMPLETE" checked={ST === 'COMPLETE'} onChange={this._onChangedRadio}/> 개통완료
                                        <span className="circle">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <div className="form-check mr-auto"></div>
                        <button type="submit" className="btn btn-rose">등록</button>
                    </div>
                </div>
            </form>
        );
    }
}