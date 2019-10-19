import React, { Component } from 'react'
import Swal from 'sweetalert2'
import moment from 'moment';
import PayService from '../../services/payService';
import LoadingSpinner from '../common/LoadingSpinner';

export default class PaymentEditor extends Component {
    state = {
        item:  {
            PYMT_ID: '',
            SCHE_DATE: new Date().toISOString(),
            COMP_DATE: '',
            EE_ID : '',
            PAY_TYPE: '현금',
            PAY_AMT: '',
            WRTR_ID: 'USER',
            ST : '',
            EL_ID : ''
        },
        loading: true,
    }

    constructor(props) {
        super(props);

        this._inpuSchedDateRef = React.createRef();
        this._inputComplDateRef = React.createRef();
    }

    componentDidMount() {
        const { PYMT_ID } = this.props;

        if(!!PYMT_ID) {
            PayService.get({PYMT_ID})
            .then(({data: {getPayment}}) => {
                this.setState({
                    loading: false,
                    item: getPayment
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
                [this._inpuSchedDateRef.current.name]: moment(this._inpuSchedDateRef.current.value).toISOString(),
                [this._inputComplDateRef.current.name]: moment(this._inputComplDateRef.current.value).toISOString(),
                [e.target.name]: e.target.value
            }
        });
    };

    _onChangedRadio = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                PAY_TYPE: e.currentTarget.value
            }
        });
    };

    _onClickRegister = (e) => {
        const inputObject = {
            ...this.state.item,
        }

        if(this._inpuSchedDateRef.current) {
            Object.assign(inputObject, { 
                [this._inpuSchedDateRef.current.name]: new Date(this._inpuSchedDateRef.current.value).toISOString()
            });
        }

        if(this._inputComplDateRef.current) {
            Object.assign(inputObject, { 
                [this._inputComplDateRef.current.name]: new Date(this._inputComplDateRef.current.value).toISOString()
            });
        }

        debugger;

        Swal.queue([{
            title: '상담 정보 등록',
            confirmButtonText: '등록',
            text: '상담 정보를 등록 하시겠습니까?',
            showLoaderOnConfirm: true,
            type: 'warning',
            preConfirm: () => {
                if(!!this.state.item.PYMT_ID) {
                    return PayService.update(inputObject).then(({data: {updatePayment : {PYMT_ID}}}) => {
                            Swal.insertQueueStep({
                                title: '성공!',
                                text: `지급 ID: ${PYMT_ID}`,
                                buttonsStyling: false,
                                confirmButtonClass: 'btn btn-success',
                                type: 'success',
                                preConfirm: () => {
                                    window.location.replace(`/payment/${PYMT_ID}`);
                                }
                            });
                        }, (error) => {
                            Swal.insertQueueStep({
                                title: '에러!',
                                text: '지급 정보 업데이트가 실패 하였습니다.',
                                type: 'error',
                            });
                        });
                } else {
                    return PayService.create(inputObject).then(({data: {createPayment : {PYMT_ID}}})=> {
                        Swal.insertQueueStep({
                            title: '성공!',
                            text: `지급 ID: ${PYMT_ID}`,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success',
                            type: 'success',
                            preConfirm: () => {
                                window.location.replace(`/payment/${PYMT_ID}`);
                            }
                        });
                    }, (error)=> {
                        Swal.insertQueueStep({
                            title: '에러!',
                            text: '지급 정보 등록이 실패 하였습니다.',
                            type: 'error',
                        });
                    })
                }
            }
          }]);
    }

    _onClickClearScheDate = () => {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                SCHE_DATE: '',
            }
        });
    }

    _onClickClearCompDate = () => {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                COMP_DATE: '',
            }
        });
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                    {this.state.loading ? <LoadingSpinner></LoadingSpinner>:null}
                    <form id="EnrollmentValidation" action="" method="">
                        <div className="card ">
                            <div className="card-header card-header-info card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">attach_money</i>
                                </div>
                                <h4 className="card-title">지급 작성 폼</h4>
                            </div>
                            <div className="card-body">
                                {this.state.item.PYMT_ID ? 
                                    (<div className="row">
                                        <label className="col-sm-3 col-form-label">지급 ID</label>
                                        <div className="col-sm-8">
                                            <div className="form-group bmd-form-group">
                                                <input className="form-control" type="text" name="PYMT_ID" aria-required="true" disabled value={this.state.item.PYMT_ID} onChange={this._onChangeHandler}/>
                                            </div>
                                        </div>
                                    </div>) : null
                                }
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">지급 예정 날짜</label>
                                    <div className="col-sm-7">
                                        <div className="form-group bmd-form-group is-filled">
                                            <input className="form-control datetimepicker" type="text" name="SCHE_DATE" required={true} autoComplete={false} value={this.state.item.SCHE_DATE ? moment(this.state.item.SCHE_DATE).format("YYYY/MM/DD h:mm A") : ''} onChange={this._onChangeHandler} ref={this._inpuSchedDateRef}/>
                                            <span className="material-input"></span>
                                            <span className="material-input"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-1">
                                        <button type="button" className="close" aria-hidden="true" onClick={this._onClickClearScheDate}>
                                            <i className="material-icons">clear</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">지급 완료 날짜</label>
                                    <div className="col-sm-7">
                                        <div className="form-group bmd-form-group is-filled">
                                            <input className="form-control datetimepicker" type="text" name="COMP_DATE" required={true} autoComplete={false} value={this.state.item.COMP_DATE ? moment(this.state.item.COMP_DATE).format("YYYY/MM/DD h:mm A") : ''} onChange={this._onChangeHandler} ref={this._inputComplbutton}/>
                                            <span className="material-input"></span>
                                            <span className="material-input"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-1">
                                        <button type="button" className="close" aria-hidden="true" onClick={this._onClickClearCompDate}>
                                            <i className="material-icons">clear</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">지급 처리 직원 ID</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="EE_ID" aria-required="true" autoComplete="false" value={this.state.item.EE_ID} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">접수 ID</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="EL_ID"  aria-required="true" autoComplete="false"value={this.state.item.EL_ID} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label label-checkbox">지급 방법</label>
                                    <div className="col-sm-8 checkbox-radios">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="PAY_TYPE" value="사은품" checked={this.state.item.PAY_TYPE === '사은품'} onChange={this._onChangedRadio}/> 사은품
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="PAY_TYPE" value="현금" checked={this.state.item.PAY_TYPE === '현금'} onChange={this._onChangedRadio}/> 현금
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="PAY_TYPE" value="지류" checked={this.state.item.PAY_TYPE === '지류'} onChange={this._onChangedRadio}/> 지류
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">지급 금액</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="PAY_AMT"  aria-required="true" autoComplete="false"value={this.state.item.PAY_AMT} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">상태</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="ST"  aria-required="true" autoComplete="false" value={this.state.item.ST} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <div className="form-check mr-auto"></div>
                                <button type="button" className="btn btn-info" onClick={this._onClickRegister} onChange={this._onChangeHandler}>등록</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}