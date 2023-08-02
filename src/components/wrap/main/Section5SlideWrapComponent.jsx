import React from 'react';
import $ from 'jquery';
import { GlobalContext } from '../../context/GlobalContext';


export default function Section5SlideWrapComponent({상품, 기본변수}) {

    const {setViewProduct} = React.useContext(GlobalContext); 

    const [state, setState] = React.useState({
        startTime: 기본변수.타임세일시작일시,        
        houres:0,
        minutes:0,
        seconds:0
    });

    const [timeSale24Houres] = React.useState(state.startTime.setHours(state.startTime.getHours()+기본변수.세일시간));


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

            let nowDate = new Date();  // 현재 시간 1초간격으로 호출한다.
            let countTime = timeSale24Houres - nowDate; // 타임세일 종료시간 1/1000초 단위로 환산 


            let H = Math.floor(countTime/(60*60*1000)%24);
            let M = Math.floor(countTime/(60*1000)%60);
            let S = Math.floor(countTime/(1000)%60);

            // 종료
            if( nowDate >= timeSale24Houres  ){
                clearInterval(setId);
                H = 0;
                M = 0;
                S = 0;
                setState({
                    ...state,
                    houres: H < 10 ? `0${H}` : H,
                    minutes: M < 10 ? `0${M}` : M,
                    seconds: S < 10 ? `0${S}` : S
                })

            }
            else{
                setState({
                    ...state,
                    houres: H < 10 ? `0${H}` : H,
                    minutes: M < 10 ? `0${M}` : M,
                    seconds: S < 10 ? `0${S}` : S
                })
            }


        }

       setId = setInterval(timeSale, 1000); //1초간격으로 타임세일함수 호출


    },[state, state.houres, state.minutes, state.seconds, timeSale24Houres]);
 
    return (
        <ul className="slide-wrap">
            <li className="slide slide1">
                <div className="col-gap">

                    <h2>일일특가</h2>
                    <h4>24시간 한정 특가</h4>
                    <div className='day-titmer-box'>
                        <img src="./images/intro/day_titmer.svg" alt="" />
                        <span className='houres'>{state.houres}</span>
                        <i>:</i>
                        <span className='minutes'>{state.minutes}</span>
                        <i>:</i>
                        <span className='seconds'>{state.seconds}</span>
                    </div>
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

// 프롭스 설정
// new Date("2023-05-14 21:30:00") 

Section5SlideWrapComponent.defaultProps = {
    기본변수:{
        타임세일시작일시: new Date("2023-05-19 09:30:00"),
        세일시간: 24
    }    
}


