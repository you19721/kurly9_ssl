import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import GoTopComponent from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
// 서브페이지
import Sub1Component from './wrap/main_sub/Sub1Component';
import Sub2Component from './wrap/main_sub/Sub2Component';
import Sub3Component from './wrap/main_sub/Sub3Component';
import Sub4Component from './wrap/main_sub/Sub4Component';
import Sub5SingupComponent from './wrap/main_sub/Sub5SingupComponent';
import Sub6SinginComponent from './wrap/main_sub/Sub6SinginComponent';
import Sub7NoticeComponent from './wrap/main_sub/Sub7NoticeComponent';
import FooterComponent from './wrap/FooterComponent';
// 컨펌모달
import ConfirmModalComponent from './wrap/ConfirmModalComponent';
// 카카오 주소검색  API
import PostCodeComponent from './wrap/PostCodeComponent';

// 컨텍스트 가져오기
import { GlobalContext } from './context/GlobalContext';


export default function WrapComponent() {

    // 카카오 주소검색 상태관리
    const [postAddr, setPostAddr] = React.useState({
        주소1: '',
        주소2: '',
        isPostShow: false,
        postKey: 'DAUMPOSTCODEADDRESS',
        isAddress: false
    });

    const postCodeOpen=()=>{
        setPostAddr({
            ...postAddr,
            주소1:'',
            주소2:'',
            isModalShow: true,
        })
    }
    const postCodeClose=()=>{
        setPostAddr({
            ...postAddr,
            isModalShow: false,
        })
    }

    // 주소 가져오기
    React.useEffect(()=>{
        let result = '';
        if(sessionStorage.getItem(postAddr.postKey)!==null){
           result = JSON.parse(sessionStorage.getItem(postAddr.postKey));
           setPostAddr({
            ...postAddr,
            주소1: result.주소1,
            주소2: result.주소2,
            isAddress: true
           })
        }
    },[postAddr.주소1, postAddr.주소2 ]);


    // 컨펌모달  상태관리
    const [modal, setModal] = React.useState({
        isModalShow: false,
        msg : '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',        
    });

    // 컨펌모달 열기함수
    const confirmModalOpen=(msg)=>{
        setModal({
            ...modal,
            msg: msg,
            isModalShow: true
        })
    }
    // 컨펌모달 닫기함수
    const confirmModalClose=()=>{
        setModal({
            ...modal,
            isModalShow: false
        })
    }



    const [key] = React.useState('VIEW_PRODUCT_KURLY');

    const [state, setState] = React.useState({
        idx: 500000,
        image: '',
        time: ''
    });

    const [product, setProduct] = React.useState([]);


    // 최근 본 상품 세터함수
    const setViewProduct=(obj, item)=>{
       
        setState({
            idx: item.제품코드,
            image: obj.image,
            time: obj.time
        })
               
    }

    // 상태변수 변경되면 저장되면 즉각 실행
    React.useEffect(()=>{
        setViewProduct_();
        getViewProduct();
    },[state.image]);

    // 최근 본 상품 목록 => 세터함수
    const setViewProduct_=()=>{

        let arr = [];
        if( localStorage.getItem(key)!==null ){
            arr = JSON.parse(localStorage.getItem(key)); // []  
            arr=[state, ...arr]; // 스택 방식 저장 Stack => LIFO(Last In First Out) => 양동이 Burkit
        }
        else{
            arr = [ state ];  // 배열 입력
        }

        if(state.image!=='' && state.time!==''){
            localStorage.setItem(key,  JSON.stringify(arr));
        }
            

    }


    // 게터함수
    const getViewProduct=()=>{
        if( localStorage.getItem(key)!==null ){           
            setProduct( JSON.parse(localStorage.getItem(key)) ); // 문자열 => 객체로변환            
        }
    }




    // 탑모달 상태관리 : 변수, 세터함수
    const [topModal, setTopModal ] = React.useState(true); // 상태관리 훅

    // 탑모달 닫기함수  => 셋쿠키 설정
    const setTopModalClose=(value, expires)=>{
        setTopModal(false);
        setCookie(value, expires);      
    }

    // 셋쿠키함수
    const setCookie=(value, expires)=>{
        // document.cookie = `키=값; 패스=/; 만료일=날짜.국제표준시();`; //쿠키설정
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + expires  );
        // toDay.setMinutes( toDay.getMinutes() + expires  );
        // toDay.setSeconds( toDay.getSeconds() + expires  );
        document.cookie = `MJ_KURLY_COOKIE=${value}; path=/; expires=${toDay.toUTCString()};`; //쿠키설정
    }

    // 겟쿠키함수 : 설정된 쿠키를 가져오기
    const getCookie=()=>{
        if(document.cookie==='') return; // 쿠키가 없으면 리턴 강제 종료

        let result = document.cookie.split(';'); // 쎄미콜론을 기준으로 줄단위로 잘려서 배열에저장된다.
                             // cookie[0]: "MJ_KURLY_COOKIE=YES"
        let cookie = [];    // cookie[0] 키:MJ_KURLY_COOKIE  ,  값 : YES

        result.map((item, i)=>{
            cookie[i] = {
                key: item.split('=')[0].trim(),  // = 등호를 기준으로 칸단위로 잘려서 저장
                value: item.split('=')[1].trim()
            }
        });

        // 키 검색 => MJ_KURLY_COOKIE 
        // 값 검색 => YES
        cookie.map((item)=>{
            if(item.key === 'MJ_KURLY_COOKIE' && item.value === 'YES'){
                setTopModal(false); // 모달창 닫기
            }
        });

    }

    React.useEffect(()=>{
        getCookie();
    }, [topModal]);

    return (
        <div id='wrap'>
            <GlobalContext.Provider  value={{setViewProduct, confirmModalOpen, confirmModalClose, modal, setModal, postCodeOpen, postCodeClose, postAddr, setPostAddr}}>
                {
                topModal && <TopModalComponent setTopModalClose={setTopModalClose} />               
                }

                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path='/' element={<HeaderComponent />}>
                            <Route index  element={<MainComponent  />} />
                            <Route path='/main'       element={<MainComponent  />} />
                            <Route path='/sub1'       element={<Sub1Component/>} />
                            <Route path='/sub2'       element={<Sub2Component/>} />
                            <Route path='/sub3'       element={<Sub3Component/>} />
                            <Route path='/sub4'       element={<Sub4Component/>} />
                            <Route path='/sub5Signup' element={<Sub5SingupComponent/>} />
                            <Route path='/sub6Signin' element={<Sub6SinginComponent/>} />
                            <Route path='/sub7Notice' element={<Sub7NoticeComponent/>} />
                        </Route>
                    </Routes>
                </BrowserRouter> 

                <FooterComponent />
                <GoTopComponent />
                <QuickMenuComponent product={product} />

                {modal.isModalShow && <ConfirmModalComponent />}
                {postAddr.isPostShow && <PostCodeComponent />}


             </GlobalContext.Provider>
        </div>
    );
};
