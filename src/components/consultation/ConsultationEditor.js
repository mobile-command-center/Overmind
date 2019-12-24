import React, { Component } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import ConsultService from '../../services/consultService';
import LoadingSpinner from '../common/LoadingSpinner';
import PhoneNumber from '../../utils/PhoneNumber';
import ConsultationSearchModal from '../consultation/ConsultationSearchModal';
import { Row, Col } from 'react-bootstrap';

export default class ConsultationEditor extends Component {
    constructor(props) {
        super(props);

        const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

        this.state = {
            item:  {
                CONST_ID: '',
                WRTR_ID: userInfo.email,
                C_TEL : '',
                DATE_INSTALL : new Date().toISOString(),
                P_SUBSIDY_AMT : '',
                AVAL_INQUIRY_PASS: false,
                PPSTY: '중간',
                ST: '상담만',
                REC_TEL: ''
            },
            loading: true,
        };

        this._inputDateRef = React.createRef();
        this._phoneSearchRef = React.createRef();
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
                [this._inputDateRef.current.name]: moment(this._inputDateRef.current.value, 'YYYY/MM/DD h:mm A').toISOString(),
            }
        }

        if(e.target.name === 'C_TEL' || e.target.name === 'REC_TEL') {
            newState.item[e.target.name] = String(e.target.value).replace(/[^(0-9)]/gi, '');
        } else {
            newState.item[e.target.name] = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
        }

        this.setState(newState);
    };

    _onClickRegister = (e) => {
        Swal.queue([{
            title: '상담 정보 저장',
            confirmButtonText: '저장',
            text: '상담 정보를 등록 하시겠습니까?',
            showLoaderOnConfirm: true,
            type: 'warning',
            preConfirm: () => {
                if(!!this.state.item.CONST_ID) {
                    return ConsultService.update({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: moment(this._inputDateRef.current.value, 'YYYY/MM/DD h:mm A').toISOString()
                    }).then(({data: {updateConsultation : {CONST_ID}}}) => {
                            Swal.insertQueueStep({
                                title: '성공!',
                                text: `상담 ID: ${CONST_ID}`,
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
                                text: '상담 정보 업데이트가 실패 하였습니다.',
                                type: 'error',
                            });
                        });
                } else {
                    return ConsultService.create({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: moment(this._inputDateRef.current.value, 'YYYY/MM/DD h:mm A').toISOString()
                    }).then(({data: {createConsultation : {CONST_ID}}})=> {
                        Swal.insertQueueStep({
                            title: '성공!',
                            text: `상담 ID: ${CONST_ID}`,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success',
                            type: 'success',
                            preConfirm: () => {
                                window.location.replace(`/consultation/edit/${CONST_ID}`);
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

    _onKeyDownHandler = (e) => {
        if(e.keyCode === 13) {
            this._phoneSearchRef.current.openModal();
        }
    }

    _onSuccessConsultationSearchModal = (consultation) => {
        this.setState({
            ...this.state,
            item: consultation
        });
    }

    _renderCustomerInfo = () => {
        return(
            <form id="EnrollmentValidation" action="" method="">
                <div className="card ">
                    <div className="card-header card-header-rose card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">person</i>
                        </div>
                        <h4 className="card-title">상담 작성 폼 (ID : {this.state.item.CONST_ID})</h4>
                    </div>
                    <div className="card-body">
                        <Row>
                            <Col>
                                <Row>
                                    <label className="col-sm-3 col-form-label">고객 전화 번호</label>
                                    <Col sm="5" md="6">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="C_TEL" aria-required="true" autoComplete="false" value={PhoneNumber(this.state.item.C_TEL)} onChange={this._onChangeHandler} onKeyDown={this._onKeyDownHandler}/>
                                        </div>
                                    </Col>
                                    <Col sm="2">
                                        <ConsultationSearchModal ref={this._phoneSearchRef} onSuccess={this._onSuccessConsultationSearchModal} searchText={this.state.item.C_TEL}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row>
                                    <label className="col-sm-3 col-form-label">최종 상태</label>
                                    <Col sm="8">
                                        <div className="form-group bmd-form-group">
                                            <select className="selectpicker" data-style="select-with-transition" name="ST" value={this.state.item.ST} onChange={this._onChangeHandler}>
                                                <option value="상담만">상담만</option>
                                                <option value="신청서 송부">신청서 송부</option>
                                                <option value="신청서 접수완료">신청서 접수완료</option>
                                                <option value="보류">보류</option>
                                                <option value="설치완료">설치완료</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <label className="col-sm-3 col-form-label">최종 후기 지급 금액</label>
                                    <Col sm="8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="P_SUBSIDY_AMT"  aria-required="true" autoComplete="false" value={this.state.item.P_SUBSIDY_AMT || ''} onChange={this._onChangeHandler}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <label className="col-sm-3 col-form-label">설치 예정일</label>
                                    <Col sm="8">
                                        <div className="form-group bmd-form-group is-filled">
                                            <input className="form-control datetimepicker" type="text" name="DATE_INSTALL" required={true} value={moment(this.state.item.DATE_INSTALL).format("YYYY/MM/DD h:mm A")} onChange={this._onChangeHandler} ref={this._inputDateRef}/>
                                            <span className="material-input"></span>
                                            <span className="material-input"></span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <label className="col-sm-3 col-form-label">고객 사은품 의존</label>
                                    <div className="col-lg-5 col-md-6 col-sm-3">
                                        <select className="selectpicker" data-style="select-with-transition" name="PPSTY" value={this.state.item.PPSTY} onChange={this._onChangeHandler}>
                                            <option value="아주높음">아주높음</option>
                                            <option value="높음">높음</option>
                                            <option value="보통">보통</option>
                                            <option value="낮음">낮음</option>
                                        </select>
                                    </div>

                                </Row>
                            </Col>
                            <Col>
                                <div className="checkbox-radios">
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
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <label className="col-sm-3 col-form-label">추천인 전화 번호</label>
                                    <Col sm="8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="REC_TEL" aria-required="true" autoComplete="false" value={PhoneNumber(this.state.item.REC_TEL)} onChange={this._onChangeHandler}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </div>
                    <div className="card-footer text-right">
                        <div className="form-check mr-auto"></div>
                        <button type="button" className="btn btn-rose" onClick={this._onClickRegister} onChange={this._onChangeHandler}>저장</button>
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