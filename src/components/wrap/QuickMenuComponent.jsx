import React from 'react';
import deliveryInfo from './img/quick_menu/deliveryInfo.png';
import icon_arrow from './img/quick_menu/icon_arrow.svg';
import './scss/quick_menu.scss';


export default function QuickMenuComponent({product}) {

    const [isQuickMenu, setIsQuickMenu] = React.useState(false);

    React.useEffect(()=>{
        window.addEventListener('scroll', function(){
            let isQuickMenu=false;
            if(window.scrollY >= 560){
                isQuickMenu=true;
            }
            else{
                isQuickMenu=false;
            }

            setIsQuickMenu(isQuickMenu);

        })
    });

    // 선택자
    const refViewList = React.useRef();
    const [cnt, setCnt] = React.useState(0);

    const productSlide=()=>{
        refViewList.current.style.transition = "all 0.6s ease-in-out";
        refViewList.current.style.transform = `translateY(${-84 * cnt}px)`;
    }

    React.useEffect(()=>{
        productSlide();
    },[cnt]);

    // 슬라이드 이미지 위로 이동하기
    const onClickUp=(e)=>{
        e.preventDefault();
        if(cnt >= product.length-3) return;   // product.length => 17  0 ~ 16
        setCnt(cnt+1);        
    }

    // 슬라이드 이미지 아래로 이동하기
    const onClickDown=(e)=>{
        e.preventDefault();
        if(cnt < 1 ) return;   // 1
        setCnt(cnt-1);       
    }

    return (
        <div id='quickMenu' className={isQuickMenu?'on':''}>
            <div className="top">
               <a href="!#">
                    <img src={deliveryInfo} alt="" /> 
               </a> 
            </div>

            <div className='gap'></div>

            <div className="middle">
                <p><a href="!#">등급별 혜택</a></p>
                <p><a href="!#">레시피</a></p>
            </div>

            <div className='gap'></div>

            <div className="bottom">
                <div className='arrow-top'  onClick={onClickDown}><img src={icon_arrow} alt="" /></div>
                <div className="title">최근 본 상품</div>
                <div className="slide-view">
                    <ul className='view-list'  ref={refViewList}>
                    {
                        product.map((item, idx)=>{
                            return(
                                <li key={idx}><a href="!#"><img src={item.image} alt="" /></a></li>
                            )
                        })                   
                    }
                    </ul>
                </div>
                <div onClick={onClickUp} className='arrow-bottom'><img src={icon_arrow} alt="" /></div>
            </div>
        </div>
    );
};
