import React from 'react';
import { GlobalContext } from '../context/GlobalContext';
import './scss/post_colde.scss';
// 카카오주소검색 API 설치
import Postcode  from "react-daum-postcode";

export default function PostCodeComponent() {

    const { postAddr, setPostAddr} = React.useContext(GlobalContext);

    const [state, setSTate] = React.useState({
        주소1:'',
        주소2:'',
        moreView: false
    });

    const onChangeAddr1=(e)=>{
        setSTate({
            ...state,
            주소1: e.target.value
        })
    }
    const onChangeAddr2=(e)=>{
        setSTate({
            ...state,
            주소2: e.target.value
        })
    }

    const moreViewFn=(e)=>{
        e.preventDefault();
        setSTate({
            ...state,
            moreView: !state.moreView
        })
    }

    const onCompletePostCode=(data)=>{
        console.log(  data );
        let extraAddr ='';
        if(data.userSelectedType === 'R'){          
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }                              
        }

        setSTate({
            ...state,
            주소1: `${data.address} ${extraAddr}` 
        })
    }

    const stylePostCode = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',  
        background:'#fff'      
    }

    // 주소 저장 클릭 이벤트
    const onClickAddressSave=(e)=>{
        e.preventDefault();
        const obj = {
            주소1: state.주소1,
            주소2: state.주소2
        }

        sessionStorage.setItem(postAddr.postKey, JSON.stringify(obj));

        setPostAddr({
            ...postAddr,
            주소1: state.주소1,
            주소2: state.주소2,
            isPostShow: false,
            isAddress: true
        })

    }



    return (
        <div id='postCode'>
            <div className="wrap">
                <div className="container">
                    
                    <div className="content">
                          <ul>
                            <li><h2><strong>샛별배송</strong><em>지역입니다.</em></h2></li>
                            <li><p>매일 새벽, 문 앞까지 신선함을 전해드려요.</p></li>
                            <li>
                                <div className="input-box">
                                    {state.주소1}
                                </div>
                            </li>
                            <li>
                                <div className="input-box">
                                    <input 
                                        type="text" 
                                        name='addr2' 
                                        id='addr2' 
                                        placeholder='주소2' 
                                        value={state.주소2} 
                                        onChange={onChangeAddr2}
                                    />
                                </div>
                            </li>
                            <li>
                                <p>
                                    ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br/>
                                    로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                </p>
                            </li>
                            <li>
                                <button onClick={onClickAddressSave}>저장</button>
                            </li>
                            <li>

                                <h4>샛별배송 지역 중 배송불가 장소 안내</h4>
                                <h5>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</h5>
                                <span><a href="!#" className={state.moreView?'on':null}  onClick={moreViewFn}>자세히보기<i></i></a></span>
                            </li>
                            <li>
                            {
                                state.moreView && (
                                    <div id='moreView'>
                                        <ul class="css-lu7l5g ep04gzj0">
                                            <li>가락동농수산물도매시장</li>
                                            <li>가락동농수산물시장</li>
                                            <li>가천대학교</li>
                                            <li>고려대학교안암캠퍼스</li>
                                            <li>고매동 일부(일부지역만 배송가능)</li>
                                            <li>국립중앙박물관</li>
                                            <li>국민대학교</li>
                                            <li>덕성여자대학교</li>
                                            <li>덕양구 신원동 일부(일부지역만 배송가능)</li>
                                            <li>도내동 일부(원흥지구만 배송가능)</li>
                                            <li>동덕여자대학교</li>
                                            <li>반월특수지구</li>
                                            <li>서경대학교</li>
                                            <li>서울사이버대학교</li>
                                            <li>서울시립대학교</li>
                                            <li>서울여자대학교</li>
                                            <li>성균관대학교</li>
                                            <li>성신여자대학교</li>
                                            <li>세종대학교</li>
                                            <li>연세대학교</li>
                                            <li>이화여자대학교</li>
                                            <li>한국외국어대학교</li>
                                            <li>홍익대학교</li>
                                        </ul>
                                    </div>
                                )
                            }
                            </li>
                          </ul>                            
                    </div>   

                   
                    <Postcode 
                        style={stylePostCode}   
                        onComplete={onCompletePostCode}
                    />                    
                     

                </div>
            </div>

           
        </div>
    );
};
