import React, { Component } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import enrollService from '../../services/enrollService';
import ConsultationSearchModal from '../consultation/ConsultationSearchModal';
import { Row, Col } from 'react-bootstrap';


export default class EnrollmentEditor extends Component {
    state = {
        item:  {
            EL_ID: '',
            DATE: new Date().toISOString(),
            WRTR_ID: 'USER', // @TODO 로그인 사용자 ID 자동 입력
            WRT_DATE: '',
            CONST_ID: '',
            EE_ID: '',
            APL_ID: '',
            CPAN: '',
            PROD: '',
            ST: '준비',
            GIFT_AMT: '',
            F_SUBSIDY_AMT: ''
        },
        loading: true,
    }

    constructor(props) {
        super(props);

        this._inputDateRef = React.createRef();
    }

    componentDidMount() {
        const { EL_ID } = this.props;

        if(!!EL_ID) {
            enrollService.get({EL_ID})
            .then(({data: {getEnrollment}}) => {
                this.setState({
                    loading: false,
                    item: getEnrollment
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
                [e.target.name]: e.target.value
            }
        });
    };

    _onChangedRadio = (e) => {
        this.setState({
            item: {
                ...this.state.item,
                ST: e.currentTarget.value
            }
        });
    }

    _onClickRegister = (e) => {
        Swal.queue([{
            title: '접수 정보 등록',
            confirmButtonText: '등록',
            text: '접수 정보를 등록 하시겠습니까?',
            showLoaderOnConfirm: true,
            type: 'warning',
            preConfirm: () => {
                if(!!this.state.item.EL_ID) {
                    return enrollService.update({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {updateEnrollment : {EL_ID}}}) => {
                            Swal.insertQueueStep({
                                title: '성공!',
                                text: `접수 ID: ${EL_ID}`,
                                buttonsStyling: false,
                                confirmButtonClass: 'btn btn-success',
                                type: 'success',
                                preConfirm: () => {
                                    window.location.replace(`/enrollment/${EL_ID}`);
                                }
                            });
                        }, (error) => {
                            Swal.insertQueueStep({
                                title: '에러!',
                                text: '접수 정보 업데이트가 실패 하였습니다.',
                                type: 'error',
                            });
                        });
                } else {
                    return enrollService.create({
                        ...this.state.item,
                        [this._inputDateRef.current.name]: new Date(this._inputDateRef.current.value).toISOString()
                    }).then(({data: {createEnrollment : {EL_ID}}})=> {
                        Swal.insertQueueStep({
                            title: '성공!',
                            text: `상담 ID: ${EL_ID}`,
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success',
                            type: 'success',
                            preConfirm: () => {
                                window.location.replace(`/enrollment/${EL_ID}`);
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

    _onSuccessConsultationSearchModal = (Consultation) => {
        const CONST_ID = Consultation.CONST_ID;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                CONST_ID,
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
            <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                    <form id="EnrollmentValidation" action="" method="">
                        <div className="card ">
                            <div className="card-header card-header-rose card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">how_to_reg</i>
                                </div>
                                <h4 className="card-title">접수 작성 폼</h4>
                            </div>
                            <div className="card-body">
                                { EL_ID ? 
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">접수 ID</label>
                                        <div className="col-sm-8">
                                            <div className="form-group bmd-form-group">
                                                <input className="form-control" type="text" name="EL_ID" aria-required="true" disabled value={EL_ID} onChange={this._onChangeHandler}/>
                                            </div>
                                        </div>
                                    </div> : null 
                                }
                                <Row>
                                    <label className="col-sm-3 col-form-label">접수 시간</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group is-filled">
                                        <input className="form-control datetimepicker" type="text" name="DATE" required={true} value={moment(DATE).format("YYYY/MM/DD h:mm A")} onChange={this._onChangeHandler} ref={this._inputDateRef}/>
                                            <span className="material-input"></span>
                                            <span className="material-input"></span>
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <label className="col-sm-3 col-form-label">접수 직원 ID</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="EE_ID" aria-required="true" autoComplete="false" value={EE_ID} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <label className="col-sm-3 col-form-label">상담 ID</label>
                                    <Col sm="5" md="6">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="CONST_ID" aria-required="true" autoComplete="false" value={CONST_ID}/>
                                        </div>
                                    </Col>
                                    <Col sm="2">
                                        <ConsultationSearchModal onSuccess={this._onSuccessConsultationSearchModal}></ConsultationSearchModal>
                                    </Col>
                                </Row>
                                <Row>
                                    <label className="col-sm-3 col-form-label">신청서 ID</label>
                                    <div className="col-sm-5 col-md-6">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="APL_ID" aria-required="true" autoComplete="false" value={APL_ID} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-rose btn-sm btn-round">
                                            <i className="material-icons">search</i>
                                            찾기
                                        </button>
                                    </div>
                                </Row>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">접수 회사</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="CPAN" aria-required="true" autoComplete="false" value={CPAN} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">접수 상품</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="PROD" aria-required="true" autoComplete="false" value={PROD} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">사은품 지급 금액</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="GIFT_AMT" aria-required="true" autoComplete="false" value={GIFT_AMT} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label">확정 후기 지급 금액</label>
                                    <div className="col-sm-8">
                                        <div className="form-group bmd-form-group">
                                            <input className="form-control" type="text" name="F_SUBSIDY_AMT" aria-required="true" autoComplete="false" value={F_SUBSIDY_AMT} onChange={this._onChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-sm-3 col-form-label label-checkbox">상태</label>
                                    <div className="col-sm-8 checkbox-radios">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="준비" checked={ST === '준비'} onChange={this._onChangedRadio}/> 준비
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="확인" checked={ST === '확인'} onChange={this._onChangedRadio}/> 확인
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="해피콜" checked={ST === '해피콜'} onChange={this._onChangedRadio}/> 해피콜
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="보류" checked={ST === '보류'} onChange={this._onChangedRadio}/> 보류
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="지시" checked={ST === '지시'} onChange={this._onChangedRadio}/> 지시
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="개통확인" checked={ST === '개통확인'} onChange={this._onChangedRadio}/> 개통확인
                                                <span className="circle">
                                                    <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="ST" value="개통완료" checked={ST === '개통완료'} onChange={this._onChangedRadio}/> 개통완료
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
                                <button type="button" className="btn btn-rose" onClick={this._onClickRegister}>등록</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}