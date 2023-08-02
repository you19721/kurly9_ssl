import React from 'react';
import Section1SlideWrapComponent from './Section1SlideWrapComponent';
import axios from 'axios';
import '../scss/section1.scss';

export default function Section1Component () {

    // 상태변수 
    const [state, setState] = React.useState({
        이미지소스: []
    });

    // axios 메인슬라이드 이미지소스 가져오기
    React.useEffect(()=>{
        axios({
            url:'./data/sec1_slide_data.json',
            method:'GET'
        })
        .then((res)=>{
            
            if( res.status===200 ){
                setState({
                    ...state,
                    이미지소스 : res.data.슬라이드
                })
            }
            
        })
        .catch((err)=>{
            console.log("axios실패! " + err );
        });
    }, []);  // 로딩시 1회만 실행


    return (
        <section id='section1'>

                <Section1SlideWrapComponent 이미지소스={state.이미지소스} />

        </section>
    );
};