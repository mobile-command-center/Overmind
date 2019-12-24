import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import ConsultationEditor from '../../components/consultation/ConsultationEditor';
import MemoEditor from '../../components/consultation/MemoEditor';
import MemoService from '../../services/memoService'

export default class ConsultationEdit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            limit: 999,
            edges: [],
            pageInfo: {
                endCursor: null,
                startCursor: null,
                hasPreviousPage: false
            },
        }
    }
    componentDidMount() {
        const { match } = this.props;
        const CONST_ID = match.params.CONST_ID;

        if(!!CONST_ID) {
            MemoService.search({
                first: this.state.limit,
                filter: {
                    CONST_ID: {
                        eq: CONST_ID
                    },
                }
            })
            .then(({ data: { searchMemo: MemoConnection } }) => {
                this.setState({
                    edges: MemoConnection.edges,
                    pageInfo: MemoConnection.pageInfo,
                    limit: this.state.limit,
                });
            }, (err) => {
                // 메모가 없다
                
            });
        } else {

        }
    }

    render() {
        const { match } = this.props;
        const CONST_ID = match.params.CONST_ID;
    
        return (
            <div>
                <SideBar url={"/consultation/edit"}></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <div className="content">
                        <div className="container-fluid">
                            <Row>
                                <div className="col-md-12 ml-auto mr-auto">
                                    <ConsultationEditor CONST_ID={CONST_ID}></ConsultationEditor>
                                </div>
                            </Row>
                            {this.state.edges.map(edge => {
                                return( 
                                <Row key={edge.MEMO_ID+''}>
                                    <div className="col-md-12 ml-auto mr-auto">
                                        <MemoEditor memoInfo={edge}></MemoEditor>
                                    </div>
                                </Row>);
                            })}
                            {
                                CONST_ID ? (
                                    <Row key={null+''}>
                                        <div className="col-md-12 ml-auto mr-auto">
                                            <MemoEditor CONST_ID={CONST_ID}></MemoEditor>
                                        </div>
                                    </Row>
                                ): null
                            }
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}