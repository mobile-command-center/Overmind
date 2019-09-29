import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._cardEl = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => this._cardEl.current.classList.remove('card-hidden'));
  }

  render() {
    return (
      <form className="form" method="" action="">
        <div className="card card-login card-hidden" ref={this._cardEl}>
          <div className="card-header card-header-rose text-center">
            <h4 className="card-title">아.정.당 Nexus</h4>
          </div>
          <div className="card-body ">
            <span className="bmd-form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">email</i>
                  </span>
                </div>
                <input type="email" className="form-control" placeholder="Email..."/>
              </div>
            </span>
            <span className="bmd-form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="material-icons">lock_outline</i>
                  </span>
                </div>
                <input type="password" className="form-control" placeholder="Password..."/>
              </div>
            </span>
          </div>
          <div className="card-footer justify-content-center">
            <a href="#pablo" className="btn btn-rose btn-link btn-lg">Login</a>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
