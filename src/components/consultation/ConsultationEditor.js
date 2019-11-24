import React, { Component } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment';
import ConsultService from '../../services/consultService';
import LoadingSpinner from '../common/LoadingSpinner';


export default class ConsultationEditor extends Component {
    state = {
        item:  {
            CONST_ID: '',
            WRTR_ID: 'USER',
            DATE : new Date().toISOString(),
            EE_ID : '',
            C_TEL : '',
            MEMO : '',
            P_SUBSIDY_AMT : '',
            AVAL_INQUIRY_PASS: false,
        },
        loading: true,
    }

    constructor(props) {
        super(props);

        this._inputDateRef = React.createRef();
    }

    componentDidMount() {
        const { CONST_ID } = this.props;

        if(!!CONST_ID) {
            ConsultService.get({CONST_ID})
            .then(({data: {getConsultation}}) => {
                this.setState({
                    loading: false,
                    item: getConsultation
                });
            }, () => {
                Swal.fire({
                    title: '에러!',
                    text: '상담 정보 조회를 실패 하였습니다.',
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-success',
                    type: 'error'
                });
                this.setState({
                    loading: false
                });
            });
        } else {
            this.setState({
                loading: false
            });
        }

    }

    _onChangeHandler = (e) => {
        this.setState({
            ...this.state,
            item : {
                ...this.state.item,
                [this._inputDateRef.current.name]: this._inputDateRef.current.value,
                [e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
            }
        });
    };

    _onClickRegister = (e) => {
        Swal.queue([{
            title: '상담 정보 등록',
            confirmButtonText: '등록',
            text: '상담 정보를 등록 하시겠습니까?',
            showLoaderOnConfirm: true,
            type: 'warning',
            preConfirm: () => {
                if(!!this.state.item.CONST_ID) {
                    return ConsultService.update({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {updateConsultation : {CONST_ID}}}) => {
                            Swal.insertQueueStep({
                                title: '성공!',
                                text: `상담 ID: ${CONST_ID}`,
                                buttonsStyling: false,
                                confirmButtonClass: 'btn btn-success',
                                type: 'success',
                                preConfirm: () => {
                                    window.location.replace(`/consultation/${CONST_ID}`);
                                }
                            });
                        }, (error) => {
                            Swal.insertQueueStep({
                                title: '에러!',
                                text: '상담 정보 업데이트가 실패 하였습니다.',
                                type: 'error',
                            });
                        });
                } else {
                    return ConsultService.create({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {createConsultation : {CONST_ID}}})=> {
                        Swal.insertQueueStep({
                            title: '성공!',
                            text: `상담 ID: ${CONST_ID}`,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success',
                            type: 'success',
                            preConfirm: () => {
                                window.location.replace(`/consultation/${CONST_ID}`);
                            }
                        });
                    }, (error)=> {
                        Swal.insertQueueStep({
                            title: '에러!',
                            text: '상담 정보 등록이 실패 하였습니다.',
                            type: 'error',
                        });
                    })
                }
            }
          }]);
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                    {this.state.loading ? <LoadingSpinner></LoadingSpinner>:null}
                    <form id="EnrollmentValidation" action="" method="">
                        <div className="card ">
                            <div className="card-header card-header-warning card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">call</i>
                                </div>
                                <h4 className="card-title">상담 작성 폼</h4>
                            </div>
                            <div className="card-body">
                                {this.state.item.CONST_ID ? 
                                    (<div className="row">
                                        <label className="col-sm-3 col-form-label">상담 ID</label>
                                        <div className="col-sm-8">
                                            <div className="form-group bmd-form-group">
                                                <input className="form-control" type="text" name="CONST_ID" aria-required="true" disabled value={this.state.item.CONST_ID} onChange={this._onChangeHandler}/>
                                            </div>
                                        </div>
                                    </div>) : null
                                }
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">상담 시간</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group is-filled">
                                            <input className="form-control datetimepicker" type="text" name="DATE" required={true} value={moment(this.state.item.DATE).format("YYYY/MM/DD h:mm A")} onChange={this._onChangeHandler} ref={this._inputDateRef}/>
                                            <span className="material-input"></span>
                                            <span className="material-input"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">상담 직원 ID</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="EE_ID" aria-required="true" autoComplete="false" value={this.state.item.EE_ID} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">가용 조회 Pass</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="checkbox" name="AVAL_INQUIRY_PASS" autoComplete="false" checked={this.state.item.AVAL_INQUIRY_PASS} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">고객 전화 번호</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="C_TEL"  aria-required="true" autoComplete="false" value={this.state.item.C_TEL} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">후기 지급 금액</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="P_SUBSIDY_AMT"  aria-required="true" autoComplete="false"value={this.state.item.P_SUBSIDY_AMT} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">상담 내용</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <textarea className="form-control" rows="18" name="MEMO" value={this.state.item.MEMO} onChange={this._onChangeHandler}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <div className="form-check mr-auto"></div>
                                <button type="button" className="btn btn-warning" onClick={this._onClickRegister} onChange={this._onChangeHandler}>등록</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}