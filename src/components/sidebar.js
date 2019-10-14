import React, { Component } from 'react';

export default class SideBar extends Component {
    render() {
        const url = this.props.url;

        return(
            <div className="sidebar" data-color="rose" data-background-color="black" data-image="/assets/img/sidebar-1.jpg">
                <div className="logo">
                    <a href="https://cafe.naver.com/movedance" className="simple-text logo-mini">
                        AJ
                    </a>
                    <a href="https://cafe.naver.com/movedance" className="simple-text logo-normal">
                        아정당통신
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src="/assets/img/faces/avatar.jpg" alt=""/>
                            </div>
                            <div className="user-info">
                            <a data-toggle="collapse" href="#collapseExample" className="username">
                                <span>
                                Tania Andrew
                                <b className="caret"></b>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#myprofile">
                                            <span className="sidebar-mini"> MP </span>
                                            <span className="sidebar-normal"> My Profile </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#editprofile">
                                            <span className="sidebar-mini"> EP </span>
                                            <span className="sidebar-normal"> Edit Profile </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#settings">
                                            <span className="sidebar-mini"> S </span>
                                            <span className="sidebar-normal"> Settings </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="../examples/dashboard.html">
                                <i className="material-icons">dashboard</i>
                                <p> 상황판 </p>
                            </a>
                        </li>
                        <li className={url.indexOf("consultation") > -1 ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" data-toggle="collapse" href="#formsConsultation" aria-expanded={url.indexOf("consultation") > -1}>
                                <i className="material-icons">call</i>
                                <p> 상담
                                <b className="caret"></b>
                                </p>
                            </a>
                            <div className={url.indexOf("consultation") > -1 ? "collapse show" : "collapse"} id="formsConsultation">
                                <ul className="nav">
                                    <li className={url.indexOf("consultation/search") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/consultation/">
                                            <span className="sidebar-mini"> SR </span>
                                            <span className="sidebar-normal"> 상담 조회 </span>
                                        </a>
                                    </li>
                                    <li className={url.indexOf("consultation/edit") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/consultation/edit">
                                        <span className="sidebar-mini"> WR </span>
                                        <span className="sidebar-normal"> 상담 작성 </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={url.indexOf("application") > -1 ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" data-toggle="collapse" href="#formsApplication" aria-expanded={url.indexOf("application") > -1}>
                                <i className="material-icons">content_paste</i>
                                <p> 신청서
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className={url.indexOf("application") > -1 ? "collapse show" : "collapse"} id="formsApplication">
                                <ul className="nav">
                                    <li className={url.indexOf("application/search") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/application">
                                            <span className="sidebar-mini"> SR </span>
                                            <span className="sidebar-normal"> 신청서 조회 </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={url.indexOf("enrollment") > -1 ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" data-toggle="collapse" href="#formsEnrollment" aria-expanded={url.indexOf("enrollment") > -1}>
                                <i className="material-icons">how_to_reg</i>
                                <p> 접수
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className={url.indexOf("enrollment") > -1 ? "collapse show" : "collapse"} id="formsEnrollment">
                                <ul className="nav">
                                    <li className={url.indexOf("enrollment/search") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/enrollment/">
                                            <span className="sidebar-mini"> SR </span>
                                            <span className="sidebar-normal"> 접수 조회 </span>
                                        </a>
                                    </li>
                                    <li className={url.indexOf("enrollment/edit") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/enrollment/edit">
                                            <span className="sidebar-mini"> WR </span>
                                            <span className="sidebar-normal"> 접수 작성 </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={url.indexOf("payment") > -1 ? "nav-item active" : "nav-item"}>
                            <a className="nav-link" data-toggle="collapse" href="#formsPayment" aria-expanded={url.indexOf("payment") > -1}>
                                <i className="material-icons">attach_money</i>
                                <p> 지급
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className={url.indexOf("payment") > -1 ? "collapse show" : "collapse"} id="formsPayment">
                                <ul className="nav">
                                    <li className={url.indexOf("payment/search") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/payment/">
                                            <span className="sidebar-mini"> SR </span>
                                            <span className="sidebar-normal"> 지급 조회 </span>
                                        </a>
                                    </li>
                                    <li className={url.indexOf("payment/edit") > -1 ? "nav-item active" : "nav-item"}>
                                        <a className="nav-link" href="/payment/edit">
                                            <span className="sidebar-mini"> WR </span>
                                            <span className="sidebar-normal"> 지급 작성 </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
          </div>);
    }
}