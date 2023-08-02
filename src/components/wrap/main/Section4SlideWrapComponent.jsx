import React from 'react';
import $ from 'jquery';
import Section4SlideWrapDayTitmerBoxComponent from './Section4SlideWrapDayTitmerBoxComponent';
import { GlobalContext } from '../../context/GlobalContext';


export default function Section4SlideWrapComponent({상품}) {

    const {setViewProduct} = React.useContext(GlobalContext);


    // 상태관리(Statement Storage) => React.useState();  훅(Hook)
    // 설정 setState()  세터함수
    // 가져오기 state
    const [houres, setHoures] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    const onClickEvent=(e, item)=>{
        e.preventDefault();
        const obj = {
            image: `${process.env.PUBLIC_URL}/images/intro/${item.이미지}`,
            time  :  new Date().getTime()
        }
        setViewProduct(obj, item);
    }

    React.useEffect(()=>{
        let setId = 0;
        function timeSale(){    
            // 24시간 타임세일 시작시간 0509 19:00:00
            let startTime = new Date("2023-05-19 10:00:00"); // 타임 세일 시작 시간
            let nowDate = new Date();  // 현재 시간 1초간격으로 호출한다.
            // console.log("타임세일 시작시간 : " + startTime );
            startTime.setHours(startTime.getHours()+24);  // 시간설정 시작시간 + 24
            // console.log("타임세일 시작시간 + 24 : " + startTime );
            let endTime = startTime-nowDate; // 타임세일 종료시간 초단위로 환산 
            // console.log("타임세일 종료시간 : " + endTime ); // 956547

            let H = Math.floor(endTime/(60*60*1000)%24);
            let M = Math.floor(endTime/(60*1000)%60);
            let S = Math.floor(endTime/(1000)%60);

            // 종료
            if( nowDate >= startTime  ){
                clearInterval(setId);
                H = 0;
                M = 0;
                S = 0;

                setHoures(H);
                setMinutes(M);
                setSeconds(S);  

            }
            else{

                setHoures(H);
                setMinutes(M);
                setSeconds(S);               
            }


        }

        setId = setInterval(timeSale, 1000); //1초간격으로 타임세일함수 호출


    },[houres, minutes, seconds]);
 
    return (
        <ul className="slide-wrap">
            <li className="slide slide1">
                <div className="col-gap">

                    <h2>일일특가</h2>
                    <h4>24시간 한정 특가</h4>
                   
                    <Section4SlideWrapDayTitmerBoxComponent houres={houres} minutes={minutes} seconds={seconds} setViewProduct={setViewProduct} />

                </div>
            </li> 
        { 
            상품.map((item, idx)=>{
                return(
                    <li className={`slide slide${idx+2}`} key={item.번호}>
                        <div className="col-gap">
                            <div className="img-box">
                                <a href="!#"  onClick={(e)=>onClickEvent(e, item)}>
                                    <img src={`./images/intro/${item.이미지}`} alt="" />
                                    <span><img src="./images/intro/icon_car_purple.svg" alt="" /></span>
                                    <strong>일일특가</strong>

                                </a>
                            </div>
                            <div className="txt-box">
                                <ul>                                                    
                                    <li>{item.상품명}</li>
                                    <li className={item.할인가>0?'':'on'}><strong>{Math.round(item.할인가*100)}%</strong> <span>{Math.round(item.정가*(1-item.할인가)).toLocaleString('ko-KO')}원</span></li>
                                    <li className={item.할인가>0?'':'on'}>{item.정가.toLocaleString('ko-KO')}원</li>
                                    <li><img src="./images/intro/icon_post.svg" alt="" /><span>후기 {item.후기카운트}{item.후기카운트===999&&'+'}</span></li>
                                </ul>
                            </div>
                        </div>
                    </li>    
                )
            })
                                          
        }


        </ul>
    );
};

 