import React, { Component } from 'react'

export default class EnrollmentEditor extends Component {
    render() {
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <form id="RegisterValidation" action="" method="">
                                <div className="card ">
                                    <div className="card-header card-header-rose card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">mail_outline</i>
                                        </div>
                                        <h4 className="card-title">Register Form</h4>
                                    </div>
                                    <div className="card-body ">
                                        <div className="form-group">
                                            <label for="exampleEmail" className="bmd-label-floating"> Email Address *</label>
                                            <input type="email" className="form-control" id="exampleEmail" required="true"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="examplePassword" className="bmd-label-floating"> Password *</label>
                                            <input type="password" className="form-control" id="examplePassword" required="true" name="password"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="examplePassword1" className="bmd-label-floating"> Confirm Password *</label>
                                            <input type="password" className="form-control" id="examplePassword1" required="true" equalTo="#examplePassword" name="password_confirmation"/>
                                        </div>
                                        <div className="category form-category">
                                            * Required fields
                                        </div>
                                    </div>
                                    <div className="card-footer text-right">
                                        <div className="form-check mr-auto">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="checkbox" value="" required/> Subscribe to newsletter
                                                <span className="form-check-sign">
                                                <span className="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-rose">Register</button>
                                    </div>
                                </div>
                            </form>
                            </div>
                            <div className="col-md-6">
                                <form id="LoginValidation" action="" method="">
                                    <div className="card ">
                                        <div className="card-header card-header-rose card-header-icon">
                                            <div className="card-icon">
                                            <i className="material-icons">contacts</i>
                                            </div>
                                            <h4 className="card-title">Login Form</h4>
                                        </div>
                                        <div className="card-body ">
                                            <div className="form-group">
                                                <label for="exampleEmails" className="bmd-label-floating"> Email Address *</label>
                                                <input type="email" className="form-control" id="exampleEmails" required="true" name="emailadress"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="examplePasswords" className="bmd-label-floating"> Password *</label>
                                                <input type="password" className="form-control" id="examplePasswords" required="true" name="password"/>
                                            </div>
                                            <div className="category form-category">* Required fields</div>
                                        </div>
                                        <div className="card-footer ml-auto mr-auto">
                                            <button type="submit" className="btn btn-rose">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                                <div className="col-md-12">
                                <form id="TypeValidation" className="form-horizontal" action="" method="">
                                    <div className="card ">
                                        <div className="card-header card-header-rose card-header-text">
                                            <div className="card-text">
                                            <h4 className="card-title">Type Validation</h4>
                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">Required Text</label>
                                            <div className="col-sm-7">
                                                <div className="form-group">
                                                <input className="form-control" type="text" name="required" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-3 label-on-right">
                                            <code>required</code>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="email" email="true" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-3 label-on-right">
                                            <code>email="true"</code>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Number</label>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="number" number="true" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-3 label-on-right">
                                            <code>number="true"</code>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Url</label>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="url" url="true" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-3 label-on-right">
                                            <code>url="true"</code>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Equal to</label>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <input className="form-control" id="idSource" type="text" placeholder="#idSource" required="true" />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <input className="form-control" id="idDestination" type="text" placeholder="#idDestination" equalTo="#idSource" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-4 label-on-right">
                                            <code>equalTo="#idSource"</code>
                                        </label>
                                        </div>
                                    </div>
                                    <div className="card-footer ml-auto mr-auto">
                                        <button type="submit" className="btn btn-rose">Validate Inputs</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12">
                            <form id="RangeValidation" className="form-horizontal" action="" method="">
                                <div className="card ">
                                    <div className="card-header card-header-rose card-header-text">
                                        <div className="card-text">
                                        <h4 className="card-title">Range Validation</h4>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Min Length</label>
                                    <div className="col-sm-7">
                                        <div className="form-group">
                                            <input className="form-control" type="text" name="min_length" minLength="5" required="true" />
                                        </div>
                                    </div>
                                    <label className="col-sm-3 label-on-right">
                                        <code>minLength="5"</code>
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Max Length</label>
                                    <div className="col-sm-7">
                                        <div className="form-group">
                                           <input className="form-control" type="text" name="max_length" maxLength="5" required="true" />
                                        </div>
                                    </div>
                                    <label className="col-sm-3 label-on-right">
                                        <code>maxLength="5"</code>
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Range</label>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="range" range="[6,10]" required="true" />
                                            </div>
                                        </div>
                                    <label className="col-sm-3 label-on-right">
                                        <code>range="[6,10]"</code>
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Min Value</label>
                                    <div className="col-sm-7">
                                        <div className="form-group">
                                            <input className="form-control" type="text" name="min" min="6" required="true" />
                                        </div>
                                    </div>
                                    <label className="col-sm-3 label-on-right">
                                        <code>min="6"</code>
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Max Value</label>
                                        <div className="col-sm-7">
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="max" max="6" required="true" />
                                            </div>
                                        </div>
                                        <label className="col-sm-3 label-on-right">
                                            <code>max="6"</code>
                                        </label>
                                    </div>
                                </div>
                                <div className="card-footer ml-auto mr-auto">
                                    <button type="submit" className="btn btn-rose">Validate Inputs</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}