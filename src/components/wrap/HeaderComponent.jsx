import React from 'react';
import $ from 'jquery';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';


export default function HeaderComponent() {
    
    const { postAddr, setPostAddr} = React.useContext(GlobalContext);

    const location = useLocation();
    //console.log( location.pathname );

    const row3 = React.useRef();  // 돔 요소 선택자(참조)

    const [state, setState] = React.useState({
        isNotice: false,
        isMap: false,
        isFixed: true
    });
    

    const onMouseEnterNotice=()=>{
        setState({ 
            ...state, 
            isNotice: true 
        });
    }

    const onMouseLeaveNotice=()=>{
        setState({
            ...state,
            isNotice: false
        });
    }
    
    // 주소 등록지 이벤트
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            isMap: true
        });
    }
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            isMap: false
        });  
    }


  

    // 스크롤 이벤트 : React 방식
    React.useEffect(()=>{
        const row3Top = row3.current.offsetTop;
        
        window.addEventListener('scroll', function(){
            let isFixed = true;

            if( window.scrollY >= row3Top ){
                isFixed = false;
            }
            else{
                isFixed = true;
            }
            setState({
                ...state,
                isFixed: isFixed
            })
        });

    },[]);


    // 배송지 변경  클릭 이벤트
    const onClickAddress=(e)=>{
        e.preventDefault();
        
        setPostAddr({
            ...postAddr,
            isPostShow: true
        })
    }

    return (
        <>
            <header id='header'>
                <div className="row1">
                    <div className="container">
                        <ul className="content">
                            <li><Link to="/sub5Signup" className={location.pathname==='/sub5Signup'?'on':''}>회원가입</Link></li>
                            <li><i>|</i></li>
                            <li><Link to="/sub6Signin" className={location.pathname==='/sub6Signin'?'on':''}>로그인</Link></li>
                            <li><i>|</i></li>
                            <li>
                                <Link to="/sub7Notice" className={location.pathname==='/sub7Notice'?'on':''}  onMouseEnter={onMouseEnterNotice}>고객센터<img src="./images/intro/ico_down_16x10.png" alt="" /></Link>
                                {
                                        state.isNotice && ( // 조건부 연산자    
                                            <div className="sub" onMouseLeave={onMouseLeaveNotice}>
                                                <ul>
                                                    <li><a href="!#">공지사항</a></li>
                                                    <li><a href="!#">자주하는 질문</a></li>
                                                    <li><a href="!#">1:1문의</a></li>
                                                    <li><a href="!#">대량주문 문의</a></li>
                                                </ul>
                                            </div>
                                        )
                                }
                                
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`row2${state.isFixed?'':' on'}`}>
                    <div className="container">
                        <div className="left">
                            
                            <Link to="/main"><img src="./images/intro/icon_kurly.svg" alt="" /><strong>마켓컬리</strong></Link>
                            <i>|</i>
                            <a href="!#">뷰티컬리<img src="./images/intro/icon_N.svg" alt="" /></a>
                            

                        </div>
                        <div className="center">
                            <div>
                                <input type="text" name='search' id='search' placeholder='검색어를 입력해주세요'/>
                                <a href="!#"><img src={`./images/intro/${state.isFixed===true?`icon_zoom_purple.svg`:`icon_zoom_gray.svg`}`} alt="" /></a>
                            </div>
                        </div>
                        <div className="right">
                            <a href="!#"  onMouseEnter={onMouseEnterMap} >배송지등록</a>
                        
                            { 
                                state.isMap && (
                                    <div className="sub" onMouseLeave={onMouseLeaveMap}>
                                        {
                                           
                                            postAddr.주소1 ==='' ? 
                                            (
                                                    <ul  className='addr1'>
                                                        <li><em>배송지등록</em>하고</li>
                                                        <li>구매가능한 상품을 확인하세요!</li>
                                                        <li>
                                                            <button>로그인</button>
                                                            <button  onClick={onClickAddress}><img src="./images/intro/icon_search.svg" alt="" />주소검색</button>
                                                        </li>
                                                    </ul>
                                                )
                                                :
                                                (
                                                    <ul className='addr2'>
                                                        <li>
                                                            {postAddr.주소1}  {postAddr.주소2}
                                                        </li>
                                                        <li>
                                                            <button onClick={onClickAddress}>배송지변경</button>
                                                        </li>
                                                    </ul>
                                                )
                                            
                                        }
                                    </div>
                                )
                            }
                        
                            <a href="!#">찜하기</a>
                            <a href="!#">장바구니</a>
                        </div>
                    </div>
                </div>
                <div  ref={row3} className={`row3${state.isFixed?"":' on'}`}>
                    <div className="container">
                        <div className="left">
                            <a href="!#">카테고리</a>
                        </div>
                        <div className="center">
                            <ul>
                                <li><Link to="/sub1" className={`main-btn${location.pathname==='/sub1'?' on':''}`}>신상품</Link></li>
                                <li><Link to="/sub2" className={`main-btn${location.pathname==='/sub2'?' on':''}`}>베스트</Link></li>
                                <li><Link to="/sub3" className={`main-btn${location.pathname==='/sub3'?' on':''}`}>알뜰쇼핑</Link></li>
                                <li><Link to="/sub4" className={`main-btn${location.pathname==='/sub4'?' on':''}`}>특가/혜택</Link></li>
                            </ul>
                        </div>
                        <div className="right">
                            <a href="!#"><em>샛별・택배</em> 배송안내</a>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};
