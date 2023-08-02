import React from 'react';
import Section4SlideWrapComponent from './Section4SlideWrapComponent';
import axios from 'axios';

export default function Section4Component() {

    const [state, setState] = React.useState({
        상품: []
    });

    React.useEffect(()=>{

        axios({
            url: "./data/sec4_slide_data.json",
            method: "GET"
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    상품: res.data.상품
                })
            }
        })
        .catch((err)=>{
             console.log("axios 실패" + err );
        });

    },[]);  // 로딩시 1회 실행

    return (
        <section id='section4'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>섹션4 일일특가</h2>
                    </div>
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <Section4SlideWrapComponent 상품 = {state.상품} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
