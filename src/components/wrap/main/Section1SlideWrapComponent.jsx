import React from 'react';

export default function Section1SlideWrapComponent({이미지소스}) {

    const [timerOn, setTimerOn] = React.useState(false);
    const [timerId, setTimerId] = React.useState(0);
    const [toggle,setToggle] = React.useState(0);
    const slideWrap         = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [n, setN] = React.useState(0);
    const [isArrow, setIsArrow] = React.useState(false);



    // 슬라이드 전체 개수의 너비 설정 : 디버그
    React.useEffect(()=>{
        slideWrap.current.style.width = `${100*이미지소스.length}%`; // 23*100 = 2300%
        slideWrap.current.style.marginLeft = `${-100*1}%`; // 23*100 = 2300%
        setN(이미지소스.length-2);
    },[이미지소스]);


    // cnt 상태변화를 감지하는 이펙트효과
    React.useEffect(()=>{
        if(toggle===0){
            mainSlide();
        }
        else{ // 여기는 첫번째 슬라이드에서 두번째 슬라이드로 부드럽게 이동하는 구간
            setToggle(0);
            setTimeout(function(){ // 비동기 방식처리
                mainSlide();
            },100)
        }
        
    },[cnt])
      
    // 1. 메인 슬라이드    
    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.left = `${-100 * cnt}%`;
        returnFn(); // 리턴 처음 또는 마지막 리턴
    }

    // 1-2리턴
    const returnFn=()=>{
        if (cnt > n) { // 마지막 끝에 처음[0]이 보인다. 그래서 두번째 슬라이드로 이동
            setToggle(1);
            setCnt(1); // 두번째 슬라이드
            slideWrap.current.style.transition = `none`; // 순간이동
            slideWrap.current.style.left = `0%`; // 초기화
        }
        if (cnt < 0) { // 마지막 끝에 처음[0]이 보인다. 그래서 두번째 슬라이드로 이동
            setCnt(n-1); // 두번째 슬라이드
            slideWrap.current.style.transition = `none`; // 순간이동
            slideWrap.current.style.left = `${-100 * n}%`; // 초기화
        }
    }


    // 2-1 자동 타이머 => 로딩시 1회
    React.useEffect(() => {
            let id = setInterval(() => {
                setCnt(cnt => cnt + 1)
            }, 4000);
            setTimerId(id);
            return () => clearInterval(id);
    }, [timerOn])

    
    // 2-2 다음 슬라이드
    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);  
    }

    // 2-3 이전 슬라이드
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 3-1 슬라이드 컨테이너 마우스 올라가면
    const onMouseEnterSlideContainer=(e)=>{
        e.preventDefault();
        setIsArrow(true);
        clearInterval(timerId);
    }

    // 3-1 슬라이드 컨테이너 마우스 나가면
    const onMouseLeaveSlideContainer=(e)=>{
        e.preventDefault();
        setIsArrow(false);
        setTimerOn(!timerOn);   
    }

    



    return (
        <div className="slide-container" onMouseEnter={onMouseEnterSlideContainer} onMouseLeave={onMouseLeaveSlideContainer}>
                <div className="slide-view">

                    <ul ref={slideWrap} className="slide-wrap">
                    {  
                        이미지소스.map((item,idx)=>{
                                return(
                                    <li key={idx} className="slide slide21"><a href="!#"><img src={item.src} alt="" /></a></li>
                                )
                        })
                    } 
                    </ul>

                </div>

                <a onClick={onClickNext} href="!#" className={`next-btn${isArrow===true?' on':''}`}><img src="./images/intro/icon_arrow_bg_gray.svg" alt="" /></a>
                <a onClick={onClickPrev} href="!#" className={`prev-btn${isArrow===true?' on':''}`}><img src="./images/intro/icon_arrow_bg_gray.svg" alt="" /></a>

                <span className='page-count'>
                    <em className='current'>{cnt+1>n?1:cnt+1}</em><i>/</i><em className='total'>{n}</em>
                </span>
            </div>
    );
};

 