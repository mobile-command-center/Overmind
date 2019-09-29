import React, { Component } from 'react';

export default class SideBar extends Component {
    render() {
        return(
            <div class="sidebar" data-color="rose" data-background-color="black" data-image="./assets/img/sidebar-1.jpg">
                <div class="logo">
                    <a href="https://cafe.naver.com/movedance" class="simple-text logo-mini">
                        AJ
                    </a>
                    <a href="https://cafe.naver.com/movedance" class="simple-text logo-normal">
                        아정당통신
                    </a>
                </div>
                <div class="sidebar-wrapper">
                    <div class="user">
                        <div class="photo">
                        <img src="./assets/img/faces/avatar.jpg" />
                        </div>
                        <div class="user-info">
                        <a data-toggle="collapse" href="#collapseExample" class="username">
                            <span>
                            Tania Andrew
                            <b class="caret"></b>
                            </span>
                        </a>
                        <div class="collapse" id="collapseExample">
                            <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                <span class="sidebar-mini"> MP </span>
                                <span class="sidebar-normal"> My Profile </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                <span class="sidebar-mini"> EP </span>
                                <span class="sidebar-normal"> Edit Profile </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                <span class="sidebar-mini"> S </span>
                                <span class="sidebar-normal"> Settings </span>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <ul class="nav">
                        <li class="nav-item">
                        <a class="nav-link" href="../examples/dashboard.html">
                            <i class="material-icons">dashboard</i>
                            <p> 상황판 </p>
                        </a>
                        </li>
                        <li class="nav-item active">
                        <a class="nav-link" data-toggle="collapse" href="#formsConsultation">
                            <i class="material-icons">call</i>
                            <p> 상담
                            <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="formsConsultation">
                            <ul class="nav">
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/regular.html">
                                <span class="sidebar-mini"> SR </span>
                                <span class="sidebar-normal"> 조회 </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/extended.html">
                                <span class="sidebar-mini"> WR </span>
                                <span class="sidebar-normal"> 작성 </span>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>
                        <li class="nav-item ">
                        <a class="nav-link" data-toggle="collapse" href="#formsApplication">
                            <i class="material-icons">content_paste</i>
                            <p> 신청서
                            <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="formsApplication">
                            <ul class="nav">
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/regular.html">
                                <span class="sidebar-mini"> SR </span>
                                <span class="sidebar-normal"> 조회 </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/extended.html">
                                <span class="sidebar-mini"> WR </span>
                                <span class="sidebar-normal"> 작성 </span>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#formsEnrollment">
                            <i class="material-icons">how_to_reg</i>
                            <p> 접수
                            <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="formsEnrollment">
                            <ul class="nav">
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/regular.html">
                                <span class="sidebar-mini"> SR </span>
                                <span class="sidebar-normal"> 조회 </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/extended.html">
                                <span class="sidebar-mini"> WR </span>
                                <span class="sidebar-normal"> 작성 </span>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </li>
                        <li class="nav-item ">
                        <a class="nav-link" data-toggle="collapse" href="#formsPayment">
                            <i class="material-icons">attach_money</i>
                            <p> 지급
                            <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="formsPayment">
                            <ul class="nav">
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/regular.html">
                                <span class="sidebar-mini"> SR </span>
                                <span class="sidebar-normal"> 조회 </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../examples/forms/extended.html">
                                <span class="sidebar-mini"> WR </span>
                                <span class="sidebar-normal"> 작성 </span>
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