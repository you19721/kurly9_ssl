import React from 'react';
import $ from 'jquery';
import {GlobalContext} from '../../context/GlobalContext';

export default function Section2SlideWrapComponent({상품}) {


    const {setViewProduct} = React.useContext(GlobalContext);

    const onClickEvent=(e, item)=>{
        e.preventDefault();
        const obj = {
            image: `${process.env.PUBLIC_URL}/images/intro/${item.이미지}`,
            time  :  new Date().getTime()
        }
        
        setViewProduct(obj, item);
    }

 
    return (
        <ul className="slide-wrap">

        {
            상품.map((item, idx)=>{
                return(
                    <li className="slide slide1" key={item.번호}>
                        <div className="col-gap">
                            <div className="img-box">
                                <a href="!#" onClick={(e)=>onClickEvent(e, item)}>
                                    <img src={`./images/intro/${item.이미지}`} alt="" />
                                    <span><img src="./images/intro/icon_car_purple.svg" alt="" /></span>
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

 