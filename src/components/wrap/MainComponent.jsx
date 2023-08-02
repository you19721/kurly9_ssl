import React from 'react';
import Section1Component from './main/Section1Component';
import Section2Component from './main/Section2Component';
import Section4Component from './main/Section4Component';
import Section5Component from './main/Section5Component';
import Section6Component from './main/Section6Component';
import Section7Component from './main/Section7Component';
import axios from 'axios';


export default function MainComponent() {

    
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
            
            if( res.status===200){
                setState({
                    ...state,
                    이미지소스: res.data.슬라이드
                })
            }

        })
        .catch((err)=>{
            console.log("axios실패! " + err );
        });
    }, []);  // 로딩시 1회만 실행




    return (
        <main id='main'>
            <Section1Component 이미지소스={state.이미지소스} />
            <Section2Component />
            <Section4Component />
            <Section5Component />
            <Section6Component />
            <Section7Component />
        </main>
    );
};
