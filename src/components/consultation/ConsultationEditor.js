import React, { Component } from 'react'
import Swal from 'sweetalert2'

import ConsultService from '../../services/consultService';
import LoadingSpinner from '../common/LoadingSpinner';
import PhoneNumber from '../../utils/PhoneNumber';
import ConsultationSearchModal from '../consultation/ConsultationSearchModal';
import { Row, Col } from 'react-bootstrap';

export default class ConsultationEditor extends Component {
    state = {
        item:  {
            CONST_ID: '',
            WRTR_ID: 'USER',
            C_TEL : '',
            P_SUBSIDY_AMT : '',
            AVAL_INQUIRY_PASS: false,
            PPSTY: '중간',
            ST: '상담만'
        },
        loading: true,
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

                // 정식 react용 select가 아니라서 수동으로 초기값을 세팅해주어야 한다. select의 형재 node로 버튼을 생성해서 노출하고 있다.
                document.querySelector('#EnrollmentValidation [name="PPSTY"] ~ button .filter-option-inner-inner').textContent = getConsultation.PPSTY || '보통';
                document.querySelector('#EnrollmentValidation [name="ST"] ~ button .filter-option-inner-inner').textContent = getConsultation.ST || '상담만';
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
        const newState = {
            ...this.state,
            item : {
                ...this.state.item,
            }
        }

        if(e.target.name === 'C_TEL') {
            newState.item[e.target.name] = String(e.target.value).replace(/[^(0-9)]/gi, '');
        } else {
            newState.item[e.target.name] = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
        }

        this.setState(newState);
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
                        // [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {updateConsultation : {CONST_ID}}}) => {
                            Swal.insertQueueStep({
                                title: '성공!',
                                text: `상담 ID: ${CONST_ID}`,
                                buttonsStyling: false,
                                confirmButtonClass: 'btn btn-success',
                                type: 'success',
                                preConfirm: () => {
                                    // window.location.replace(`/consultation/${CONST_ID}`);
                                    window.location.reload();
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
                        // [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {createConsultation : {CONST_ID}}})=> {
                        Swal.insertQueueStep({
                            title: '성공!',
                            text: `상담 ID: ${CONST_ID}`,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success',
                            type: 'success',
                            preConfirm: () => {
                                // window.location.replace(`/consultation/${CONST_ID}`);
                                window.location.reload();
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

    _onSuccessConsultationSearchModal = (consultation) => {
        this.setState({
            ...this.state,
            item: consultation
        });
    }

    _renderCustomerTell = () => {
        if(typeof this.props.CONST_ID !== 'undefined') {
            return (
            <Row>
                <label className="col-sm-3 col-form-label">고객 전화 번호</label>
                <Col sm="8" md="8">
                    <div className="form-group bmd-form-group">
                        <input className="form-control" type="text" name="C_TEL"  aria-required="true" autoComplete="false" value={PhoneNumber(this.state.item.C_TEL)} onChange={this._onChangeHandler}/>
                    </div>
                </Col>
            </Row>
            );
        } else {
            return (
            <Row>
                <label className="col-sm-3 col-form-label">고객 전화 번호</label>
                <Col sm="5" md="6">
                    <div className="form-group bmd-form-group">
                        <input className="form-control" type="text" name="C_TEL" aria-required="true" autoComplete="false" value={PhoneNumber(this.state.item.C_TEL)} onChange={this._onChangeHandler}/>
                    </div>
                </Col>
                <Col sm="2">
                    <ConsultationSearchModal onSuccess={this._onSuccessConsultationSearchModal}></ConsultationSearchModal>
                </Col>
            </Row>
            );
        }
    }

    _renderCustomerInfo = () => {
        return(
            <form id="EnrollmentValidation" action="" method="">
                <div className="card ">
                    <div className="card-header card-header-rose card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">person</i>
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
                        {/* <div className="row">
                            <label className="col-sm-3 col-form-label">상담 시간</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group is-filled">
                                    <input className="form-control datetimepicker" type="text" name="DATE" required={true} value={moment(this.state.item.DATE_REG).format("YYYY/MM/DD h:mm A")} onChange={this._onChangeHandler} ref={this._inputDateRef}/>
                                    <span className="material-input"></span>
                                    <span className="material-input"></span>
                                </div>
                            </div>
                        </div> */}
                        {this._renderCustomerTell()}
                        <div className="row">
                            <label className="col-sm-3 col-form-label">고객 사은품 의존</label>
                            <div className="col-lg-5 col-md-6 col-sm-3">
                                <select className="selectpicker" data-style="select-with-transition" name="PPSTY" value={this.state.item.PPSTY} onChange={this._onChangeHandler}>
                                    <option value="높음">높음</option>
                                    <option value="보통">보통</option>
                                    <option value="낮음">낮음</option>
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-4 checkbox-radios">
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" name="AVAL_INQUIRY_PASS" autoComplete="false" checked={this.state.item.AVAL_INQUIRY_PASS} onChange={this._onChangeHandler}/>
                                        가용조회 Pass
                                        <span className="form-check-sign">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-3 col-form-label">상태</label>
                            <div className="col-sm-8">
                                <div className="form-group bmd-form-group">
                                    <select className="selectpicker" data-style="select-with-transition" name="ST" value={this.state.item.ST} onChange={this._onChangeHandler}>
                                        <option value="상담만">상담만</option>
                                        <option value="신청서 송부">신청서 송부</option>
                                        <option value="신청서 접수완료">신청서 접수완료</option>
                                        <option value="보류">보류</option>
                                        <option value="설치완료">설치완료</option>
                                    </select>
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
                    </div>
                    <div className="card-footer text-right">
                        <div className="form-check mr-auto"></div>
                        <button type="button" className="btn btn-rose" onClick={this._onClickRegister} onChange={this._onChangeHandler}>등록</button>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return(
            <div>
                {this.state.loading ? <LoadingSpinner></LoadingSpinner>:null}
                {this._renderCustomerInfo()}
            </div>
        );
    }
}