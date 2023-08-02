import React from 'react';
import Section2SlideWrapComponent from './Section2SlideWrapComponent';
import axios from 'axios';
import $ from 'jquery';

export default function Section2Component() {

    const [state, setState] = React.useState({
        상품: []
    })

    React.useEffect(()=>{
        axios({
            url:'./data/sec2_slide_data.json',
            metho:'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                상품: res.data.상품
            })
        })
        .catch((err)=>{
            console.log("axios실패!" + err.data );
        });
    }, []); //로딩시 1회실행


    React.useEffect(()=>{
        let cnt=0;
        // 섹션2 슬라이드
        // 1. 메인슬라이드함수
        mainSlide();
        function mainSlide(){
            $('#section2 .slide-wrap').stop().animate({left: `${-100*cnt}%`},600);

            if(cnt===4){
                $('#section2 .next-arrow-btn').stop().fadeOut(1000);
            }
            else{
                $('#section2 .next-arrow-btn').stop().fadeIn(1000);
            }

            
            if(cnt===0){
                $('#section2 .prev-arrow-btn').stop().fadeOut(1000);
            }
            else{
                $('#section2 .prev-arrow-btn').stop().fadeIn(1000);
            }



        }
        // 2-1. 다음카운트함수
        function nextCount(){
            cnt++;
            if(cnt>4){cnt=4}
            mainSlide();
        }
        // 2-1. 이전카운트함수
        function prevCount(){
            cnt--;
            if(cnt<1){cnt=0}
            mainSlide();
        }

        // 3-1. 다음버튼클릭이벤트
        $('#section2 .next-arrow-btn').on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        });

        // 3-2. 이전버튼클릭이벤트
        $('#section2 .prev-arrow-btn').on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        });


    },[]);




    return (
        <>
            <section id='section2'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>이 상품 어때요?</h2>
                        </div>
                        <div className="content">
                            <div className="slide-container">
                                <div className="slide-view">
                                    <Section2SlideWrapComponent   상품 = {state.상품} />
                                </div>

                                <a href="!#"  className='next-arrow-btn'><img src="./images/intro/icon_slide_arrow_white.svg" alt="" /></a>
                                <a href="!#"  className='prev-arrow-btn'><img src="./images/intro/icon_slide_arrow_white.svg" alt="" /></a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='section3'>
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>섹션3타이틀</h2>
                        </div>
                        <div className="content">
                            <a href="!#"><img src="./images/intro/16d8e884-ffe7-4089-ae7d-8d2e9197af63.jpg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};