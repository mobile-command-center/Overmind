import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { PulseLoader } from 'react-spinners';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    position: absolute;
    display: block;
    margin: 0 auto;
    z-index: 999;
    top: 50%;
    left: 50%;
`;
 
export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <PulseLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={'#e91e63'}
          loading={this.props.loading}
        />
      </div> 
    )
  }
}