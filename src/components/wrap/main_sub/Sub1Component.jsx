import React from 'react';
import './scss/sub.scss';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';


export default function Sub1Component() {

    const {setViewProduct} = React.useContext(GlobalContext);

    const [product, setProduct] = React.useState([]);

    React.useEffect(()=>{
        // 신상품
        axios({
            url:'./data/sub/sub1.json',
            method: 'GET'
        })
        .then((res)=>{           
            if(res.status===200){
                setProduct(res.data.신상품);
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]); //로딩시



    // 상품이 상태변수 product에 저장되면
    // 반복문 실행 데이터 바인딩 출력


    //// 아코디언메뉴 이벤트 ////////////////////////////////////////
    const listRef = React.useRef([]); //사용시 .current
    const subRef = React.useRef([]); //사용시 .current
    const [toggle, setToggle] = React.useState([false,false,false,false,false,false]);
    const [isSub2_1, setIsSub2_1] = React.useState(true); // 가나다순
    const [isSub2_2, setIsSub2_2] = React.useState(false);// 상품 많은순

    const onClickList=(e, z)=>{ // 0 1 2 3 4 5 
        e.preventDefault();

        if(toggle[z]===false){
            toggle[z]=true;
            setToggle([...toggle]);
            listRef.current[z].style.height = '52px';
        }
        else {
            toggle[z]=false;
            setToggle([...toggle]);
            listRef.current[z].style.height = `${subRef.current[z].offsetHeight + 52}px`;            
        }
        
    }



    // 가나다순, 상품많은 순
    const onClickTab=(e, z)=>{
        e.preventDefault();
        if( z===0 ){ // 0 가나다순
            setIsSub2_1(true);
            setIsSub2_2(false);
        }
        else{  // 1 상품많은 순
            setIsSub2_1(false);
            setIsSub2_2(true);
        }
    }

    // 상품 정렬 필터
    const onClickOrder=(e, z)=>{
        e.preventDefault();
        if(z==='높은가격순'){               
            setProduct([...product.sort((a, b)=> b.정가 - a.정가 )]);
        }        
        else if(z==='낮은가격순'){   
            setProduct([...product.sort((a, b)=> a.정가 - b.정가 )]);
        }        
        else if(z==='혜택순'){   
             setProduct([...product.sort((a, b)=> b.할인율 - a.할인율 )]);
        }
        else if(z==='신상품'){ // 문자정렬  
             setProduct([...product.sort((a, b)=> (a.제품코드 < b.제품코드) ? -1 : (b.제품코드 < a.제품코드) ? 1 : 0) ]);
             //setProduct([...product.sort((a, b)=> (a.상품특징 < b.상품특징) ? (-1) : ((a.상품특징 > b.상품특징) ? (1) : (0))) ]);
        }
        
    }


    // 최근 본 상품
    
    const onClickEvent=(e, item)=>{
        e.preventDefault();
        const obj = {
            image: `${process.env.PUBLIC_URL}/images/sub/sub01/${item.이미지}`,
            time  :  new Date().getTime()
        }
        
        setViewProduct(obj, item);
    }




    return (
        <main id='mainSub1' className='main-sub'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>신상품</h2>
                        </div>
                        <div className="content">
                            <a href="!#">
                                <img src="./images/sub/sub01/aIcWA1qAhYmdq7llqnbhuurr83QSGPUwaNG2haqc.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>신상품</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-header">
                                    <span>필터</span>
                                    <span>초기화</span>
                                </div>
                                <div className="category">
                                    <ul>
                                        <li ref={(el)=>(listRef.current[0]=el)}>
                                            <a onClick={(e)=>onClickList(e, 0)} href="!#" className='list1-btn'>카테고리</a>
                                            <div ref={(el)=>(subRef.current[0]=el)} className="sub sub1">
                                                <ul>
                                                    <li><button>수산·해산·건어물</button><strong>20</strong></li>
                                                    <li><button>면·양념·오일</button><strong>06</strong></li>
                                                    <li><button>간식·과자·떡</button><strong>18</strong></li>
                                                    <li><button>과일·견과·쌀</button><strong>16</strong></li>
                                                    <li><button>생수·음료·우유·커피</button><strong>14</strong></li>
                                                    <li><button>채소</button><strong>12</strong></li>
                                                    <li><button>헤어·바디·구강</button><strong>30</strong></li>
                                                    <li><button>샐러드·간편식</button><strong>30</strong></li>
                                                    <li><button>베이커리·치즈·델리</button><strong>10</strong></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li ref={(el)=>(listRef.current[1]=el)}>
                                            <a  href="!#"  onClick={(e)=>onClickList(e, 1)} >브랜드</a>
                                            <div className="tab-btn">
                                                <button  onClick={(e)=>onClickTab(e, 0)} className={isSub2_1===true?'on':''}>가나다순</button>
                                                <button  onClick={(e)=>onClickTab(e, 1)} className={isSub2_2===true?'on':''}>상품 많은순</button>
                                            </div>
                                        {
                                          isSub2_1 && 
                                            (  
                                                <div   className="sub sub2 sub2-1" ref={(el)=>(subRef.current[1]=el)}>
                                                    <div className="ganada-order">
                                                        <a href="!#"   className='on'>&nbsp;&nbsp;전체&nbsp;&nbsp;</a><a href="!#">ㄱ</a><a href="!#">ㄴ</a><a href="!#">ㄷ</a><a href="!#">ㄹ</a><a href="!#">ㅁ</a><a href="!#">ㅂ</a><a href="!#">ㅅ</a><a href="!#">ㅇ</a><a href="!#">ㅈ</a><a href="!#">ㅌ</a><a href="!#">ㅋ</a><a href="!#">ㅍ</a><a href="!#">ㅎ</a><a href="!#">A-Z</a>
                                                    </div>
                                                    <ul>
                                                        <li><button>공유관</button><strong>20</strong></li>
                                                        <li><button>닥터브러너스</button><strong>06</strong></li>
                                                        <li><button>대흥</button><strong>18</strong></li>
                                                        <li><button>돈시몬</button><strong>16</strong></li>
                                                        <li><button>동국제약</button><strong>14</strong></li>
                                                        <li><button>리치</button><strong>12</strong></li>
                                                        <li><button>만선</button><strong>30</strong></li>
                                                        <li><button>몰튼브라운</button><strong>30</strong></li>
                                                        <li><button>생미쉘</button><strong>10</strong></li>
                                                        <li><button>스위피</button><strong>10</strong></li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                        {

                                        isSub2_2 && 
                                            (
                                                <div  className="sub sub2 sub2-2" ref={(el)=>(subRef.current[1]=el)}>
                                                    <ul>
                                                        <li><button>피쉬쉘</button><strong>20</strong></li>
                                                        <li><button>피지</button><strong>06</strong></li>
                                                        <li><button>fill</button><strong>18</strong></li>
                                                        <li><button>공유관</button><strong>16</strong></li>
                                                        <li><button>닥터브로너스</button><strong>14</strong></li>
                                                        <li><button>대흥</button><strong>12</strong></li>
                                                        <li><button>돈시몬</button><strong>30</strong></li>
                                                        <li><button>동국제약</button><strong>30</strong></li>
                                                        <li><button>리치</button><strong>10</strong></li>
                                                        <li><button>만선</button><strong>10</strong></li>
                                                    </ul>
                                                </div>
                                            )
                                        }

                                        </li>
                                        <li ref={(el)=>(listRef.current[2]=el)}>
                                            <a href="!#" onClick={(e)=>onClickList(e, 2)} >가격</a>
                                            <div className="sub sub3" ref={(el)=>(subRef.current[2]=el)}>
                                                <ul>
                                                    <li><button>5,280원 미만</button><strong>46</strong></li>
                                                    <li><button>5,280원 ~ 7,980원</button><strong>48</strong></li>
                                                    <li><button>7,980원 ~ 15,600원</button><strong>47</strong></li>
                                                    <li><button>15,600원 이상</button><strong>48</strong></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li ref={(el)=>(listRef.current[3]=el)}>
                                            <a href="!#" onClick={(e)=>onClickList(e, 3)} >혜택</a>
                                            <div className="sub sub4" ref={(el)=>(subRef.current[3]=el)}>
                                                <ul>
                                                    <li><button>할인상품</button><strong>83</strong></li>
                                                    <li><button>한정수량</button><strong>3</strong></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li ref={(el)=>(listRef.current[4]=el)}>
                                            <a href="!#" onClick={(e)=>onClickList(e, 4)} >유형</a>
                                            <div className="sub sub5" ref={(el)=>(subRef.current[4]=el)}>
                                                <ul>
                                                    <li><button>희소가치프로젝트</button><strong>2</strong></li>
                                                    <li><button>Kurly Only</button><strong>22</strong></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li ref={(el)=>(listRef.current[5]=el)}>
                                            <a href="!#"  onClick={(e)=>onClickList(e, 5)}>특정상품 제외</a>
                                            <div className="sub sub6"  ref={(el)=>(subRef.current[5]=el)}>
                                                <ul>
                                                    <li><button>반려동물상품</button><strong>1</strong></li>
                                                   
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right">
                                <div className="right-header">
                                    <span>
                                        총 189건
                                    </span>
                                    <span>
                                        <a href="!#">추천순</a>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '신상품순')} className='on'>신상품순</a>
                                        <a href="!#">판매량순</a>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '혜택순')}>혜택순</a>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '낮은가격순')}>낮은가격순</a>
                                        <a href="!#" onClick={(e)=>onClickOrder(e, '높은가격순')}>높은가격순</a>
                                    </span>
                                </div> 
                                <div className="product">
                                    <ul>

                                        { 
                                        
                                            product.map((item, idx)=>{
                                                return(
                                                    <li key={item.제품코드}>
                                                        <div className="gap">
                                                            <a href="!#" onClick={(e)=>onClickEvent(e, item)}>
                                                                <div className="img-box">
                                                                    <img src={`./images/sub/sub01/${item.이미지}`} alt="" />
                                                                    <span className='icon-cart'>
                                                                        <img src="./images/sub/sub01/icon_cart.svg" alt="" />
                                                                    </span>                                                        
                                                                </div>    
                                                                <div className="txt-box">
                                                                    <ul>
                                                                        <li><h4>{item.배송}</h4></li>
                                                                        <li><h3>{item.상품명}</h3></li>
                                                                        <li><p>{item.상품특징}</p></li>
                                                                        <li><em>{item.할인율}%</em> <strong>{(Math.round(item.정가*(1-item.할인율)).toLocaleString("ko-KR"))}원</strong></li>
                                                                        <li><span>{item.정가}</span></li>
                                                                        <li><h5>Kurly Only</h5></li>
                                                                    </ul>
                                                                </div>    
                                                            </a>
                                                        </div>
                                                    </li>
                                                
                                                )
                                            })
                                        
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};