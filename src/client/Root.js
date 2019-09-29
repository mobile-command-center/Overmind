import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

// 라우팅 처리
// https://velopert.com/3417

const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;