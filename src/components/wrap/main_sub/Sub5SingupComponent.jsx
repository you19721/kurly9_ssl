import React from 'react';
import './scss/sub5_sign_up.scss';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// 데이터베이스 테이블 생성 
// kurly_table
// idx   숫자   AutoIncrement
// 아이디 문자열 16
// 비밀번호 문자열 16
// 이름 문자열 30
// 이메일 문자열 250
// 휴대폰 문자열 010-7942-5305  13
// 주소 문자열 500
// 성별 문자열 4
// 생년월일 문자열 10  1990-10-30
// 추가입력사항 문자열 250
// 이용약관동의 문자열 1000
// 가입일  문자열 2023-07-12

// moonjong2.dothome.co.kr/myadmin
// moonjong2
// anstjswhd0105#

export default function Sub5SingupComponent({회원가입}) {


    const navigate =  useNavigate();
    const refAuthBtn = React.useRef(); // 인증번호 받기 버튼의 선택자

    const { confirmModalOpen, setModal, modal, postAddr, setPostAddr} = React.useContext(GlobalContext);


    const [state, setState] = React.useState(회원가입);

    // 아이디 입력상자
    const onChangeEventId=(e)=>{
        let msgId = '';
        let regExp1 = /(.){6,16}/g;  // 6자이상    + 1자이상 ,    * 0자이상 
        let regExp2 = /[A-Za-z]+[0-9]*/g;  // 6자 이상 16자 이하의 (영문)+ 혹은 (영문과 숫자)*를 조합

        if(regExp1.test(e.target.value) === false){
            msgId =  '6자이상 확인 입력'
        }
        else if(regExp2.test(e.target.value) === false){
            msgId =  '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합'
        }
        
        setState({
            ...state,
            아이디: e.target.value,
            msgId: msgId
        });
    }
    // 아이디 중복확인
    const onClickIdDepulicateOk=(e)=>{
        e.preventDefault();

        // 입력된 아이디가 
        // 저장된 아이디와 같다면 중복된 아이디 입니다.
        // 사용할 수 없습니다.
        // 서버와 클라이언트가 서로 통신하도록 도와주는 
        // API를 AXIOS  또는  AJAX(제이쿼리)
        let regExp1 = /(.){6,16}/g;  // 6자이상    + 1자이상 ,    * 0자이상 
        let regExp2 = /[A-Za-z]+[0-9]*/g;  // 6자 이상 16자 이하의 (영문)+ 혹은 (영문과 숫자)*를 조합
        
        if(regExp1.test(state.아이디) === false  || regExp2.test(state.아이디) === false){
            confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else {

            // 반드시 폼데이터 생성 후 데이터 전송 해야한다.
            const formData = new FormData();
            formData.append('id', state.아이디);

            axios({  // https://you19721.com 프록시 패키지 제이슨 package.json
                url: `${state.url}/idCheckOk.php`, // 아이디 중복검사
                method:'POST',
                data: formData
            })
            .then((res)=>{

                if( res.data === 0 ){ // 중복된 아이디가 아니다.  1이면 중복
                    confirmModalOpen('사용 할 수 있는 아이디 입니다');
                }
                else{
                    confirmModalOpen('사용 불가능한 아이디 입니다');
                }

            })
            .catch((err)=>{
                console.log(' AXIOS 오류! ');
            });

        }

    }


    // 비밀번호1 입력상자
    const onChangeEventPw1=(e)=>{
        // 1. 최소 10자 이상 입력
        // 2. \s  (공백 제외) 
        // 3. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 (영+,숫+)(영+,특+) (특+,숫+)
        let regExp1 = /(.){10,16}/g;
        let regExp2 = /[\s]/g;  // 공백제외
        let regExp3 = /([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+)|([`~@#$%^&*()\-_=+\\|\]}[{}'";:/?.>,<]+[A-Za-z]+)|([A-Za-z]+[`~@#$%^&*()\-_=+\\|\]}[{}'";:/?.>,<]+)|([0-9]+[`~@#$%^&*()\-_=+\\|\]}[{}'";:/?.>,<]+)|([`~@#$%^&*()\-_=+\\|\]}[{}'";:/?.>,<]+[0-9]+)/g;
        let msgPw = '';

        if( regExp1.test(e.target.value) === false ){
            msgPw =  '10자이상 확인 입력';
        }
        else if(regExp2.test(e.target.value) === true || regExp3.test(e.target.value) === false ){
            msgPw =  '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }

        setState({
            ...state,
            비밀번호: e.target.value,
            msgPw: msgPw
        });

    }

    // 비밀번호2 입력상자
    const onChangeEventPw2=(e)=>{
        let msgPwOk = '';

        if(state.비밀번호!==e.target.value){
            msgPwOk = "동일한 비밀번호를 한번더 입력해주세요";
        }
        else{
            msgPwOk =''
        }

        setState({
            ...state,
            비밀번호확인: e.target.value,
            msgPwOk: msgPwOk
        });
    }

    // 이름 입력상자
    const onChangeEventName=(e)=>{
        let msgName = '';

        if(e.target.value===''){
            msgName = '이름을 입력하세요'
        }
        else{
            msgName = '';
        }

        setState({
            ...state,
            이름: e.target.value,
            msgName: msgName
        });
    }

    // 이메일 입력상자
    // moonjong@naver.com
    // moonjong@naver.co.kr
    // moon_jong@naver.co.kr
    // moon_jong@nav_er.co.kr
    // moon.ong@nav_er.co.kr
    // `~#$%^&*\-_=+|}{}'/?.
    const onChangeEventEmail=(e)=>{

        let msgEmail = '';
        let regExp1 = /[\s]/g;
        let regExp2 = /^[A-Za-z0-9`~!#$%^_\-+=|{}'/?]+[.]?[A-Za-z0-9`~!#$%^_\-+=|{}'/?]*@[A-Za-z0-9`~!#$%^_\-+=|{}'/?]+[.]?[A-Za-z0-9`~!#$%^_\-+=|{}'/?]*\.[A-Za-z]{2,3}$/g;

        if( regExp1.test(state.이메일) === true  || regExp2.test(e.target.value) === false ){
            msgEmail =  '이메일 형식으로 입력해 주세요.';
        }
        else {
            msgEmail =  '';
        }

        setState({
            ...state,
            이메일: e.target.value,
            msgEmail: msgEmail
        });

    }

    // 이메일 중복확인
    const emailDuplicateOk=(e)=>{
        e.preventDefault();

        let regExp1 = /[\s]/g;
        let regExp2 = /^[A-Za-z0-9`~!#$%^_\-+=|{}'/?]+[.]?[A-Za-z0-9`~!#$%^_\-+=|{}'/?]*@[A-Za-z0-9`~!#$%^_\-+=|{}'/?]+[.]?[A-Za-z0-9`~!#$%^_\-+=|{}'/?]*\.[A-Za-z]{2,3}$/g;

        if(regExp1.test(state.이메일) === true  || regExp2.test(state.이메일) === false){
            confirmModalOpen('이메일 형식으로 입력해 주세요.');
        }
        else {

            // 반드시 폼데이터 생성 후 데이터 전송 해야한다.
            const formData = new FormData();
            formData.append('email', state.이메일);

            axios({
                // url:'http://you19721.dothome.co.kr/front9_kurly/emailCheckOk.php',
                url: `${state.url}/emailCheckOk.php`,
                method:'POST',
                data: formData
            })
            .then((res)=>{

                if( res.data === 0 ){ // 중복된 이메일 아니다.  1이면 중복
                    confirmModalOpen('사용 할 수 있는 이메일 입니다');
                }
                else{
                    confirmModalOpen('사용 불가능한 이메일 입니다');
                }

            })
            .catch((err)=>{
                console.log(' AXIOS 오류! ');
            });
            
        }


    }
  

    // 휴대폰 번호 입력상자
    // 숫자만 입력 
    const onChangeHp=(e)=>{
        const regExp = /[^0-9]/g;
        let 휴대폰 = '';
        let msgHp = '';
        let isBtn = false;

       
        

        // 숫자가 아니면 즉시삭제
        휴대폰 = e.target.value.replace(regExp, '');

        if( 휴대폰==='' ){
            msgHp = '휴대폰 번호를 입력해 주세요.';
        }
        else{
            msgHp = '';
        }
        
        if( 휴대폰.length >= 1 ){
            isBtn = true;
        }
        else{
            isBtn = false;
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            msgHp: msgHp,
            isBtn: isBtn
        })
    

    }



    // 인증번호 받기 버튼 클릭 이벤트
    // 1. 휴대폰 번호 유효성 체크  
    // 정규표현식  /^01?[0-9]-[0-9]{3,4}-[0-9]{4}$/g

    const onClickHp=(e)=>{
        e.preventDefault();
        let auth = 0;
        const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let 휴대폰인증번호발급='';



        if(state.다른번호인증 === true){
            refAuthBtn.current.innerHTML='인증번호 받기';
            setState({
                ...state,
                 휴대폰:'',
                isBtn: false
            })
            return;            
        }



        // 01079425305,  0103486441
        if( regExp.test( state.휴대폰 )===false ){
            confirmModalOpen('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
        }
        else{
            auth = Math.floor(Math.random()*900000+100000); // 난수 6자리 생성
            confirmModalOpen(`${auth} 휴대폰으로 인증번호가 발송되었습니다.`);
            휴대폰인증번호발급=auth;
            // 인증번호 입력상자와 확인 버튼 보이게 한다.
        }

        setState({
            ...state,
            휴대폰인증번호발급: 휴대폰인증번호발급,
            isBtn: false
        })
    }
       
    
    // 휴대폰 인증번호입력 상자
    const onChangeHpAuthInput=(e)=>{
        let isAuthOk = false;

        if(e.target.value.length > 0){
            isAuthOk = true;
        }
        else {
            isAuthOk = false;
        }
        setState({
            ...state,
            휴대폰인증번호입력: e.target.value,
            isAuthOk: true
        })  
    }


    // 발급된 휴대폰 인증번호와 입력된 인증번호 두개를 비교  같으면 통과
    const onClickHpAuthBtnOk=(e)=>{
        e.preventDefault();
        if(state.휴대폰인증번호발급===Number(state.휴대폰인증번호입력)){ // 숫자로 강제 형변환
            // 현대 인증번호입력상자 인증번화확인 버튼 모두 숨긴다.

            // 그리고 인증번호 받기 버튼이 다른번호 인증 버튼으로 변경
            // 클릭하면 다시 처음상태로 변경 버튼은 사용불가 흐리게 보인다.
            // 휴대폰번호 입력을하면 버튼 사용가능
            confirmModalOpen(`인증에 성공했습니다.`); 
            
            refAuthBtn.current.innerHTML = '다른번호 인증';

            setState({
                ...state,
                휴대폰인증번호발급: '',
                isAuthOk: false,
                isBtn: true, // '다른번호 인증'
                다른번호인증: true
            })

        }   
        else{
            confirmModalOpen(`잘못된 인증번호 입니다.`); 
        }
    }



    
    


    // 주소검색 API
    const onClickAddress=(e)=>{
        e.preventDefault();
        setPostAddr({
            ...postAddr,
            isPostShow: true
        })
    }


    const onChangeAddr1=(e)=>{
        setPostAddr({
            ...postAddr,
            주소1: e.target.value
        })
    }
    const onChangeAddr2=(e)=>{
        setPostAddr({
            ...postAddr,
            주소2: e.target.value
        })
    }

    // 성별 라디오번트
    const onChangeGender=(e)=>{
        if( e.target.checked === true ){
            setState({
                ...state,
                성별: e.target.value
            })
        }
    }


    // 생년 생월 생일   
    // - 생년월일이 미래로 입력 되었습니다.  생년 > 2023
    // - 100세이하  1990 < (2023-100) 1923
    // - 만 14세 미만은 가입이 불가합니다. 2010 >= 2009 (2023-14) 2009  

    const onChangeYear=(e)=>{
        setState({
            ...state,
            생년: e.target.value
        })
    }
    const onChangeMonth=(e)=>{
        setState({
            ...state,
            생월: e.target.value
        })
    }
    const onChangeDate=(e)=>{
        setState({
            ...state,
            생일: e.target.value
        })
    }

    // 생년 생월 생일 체크 
    React.useEffect(()=>{
        let msgBirth = '';
        let isBirth = false;

        if( state.생년==='' &&  state.생월==='' &&  state.생일===''){           
            msgBirth = '';
            isBirth = false;
        }
        else{
            if(state.생년===''){
                msgBirth = '생년을 입력하세요';
                isBirth = true; 
            }
            else if( state.생년 > new Date().getFullYear() ){    
                msgBirth = '생년월일이 미래로 입력 되었습니다.';
                isBirth = true;
            } 
            else if( state.생년 < (new Date().getFullYear()-100) ){    
                msgBirth = '생년월일을 다시 확인해주세요.';
                isBirth = true;
            } 
            else if( state.생년 >= (new Date().getFullYear()-14) ){    
                msgBirth = '만 14세 미만은 가입이 불가합니다.';
                isBirth = true;
            } 
            else{
                if(state.생월===''){
                    msgBirth = '생월을 입력하세요';
                    isBirth = true; 
                }
                else if(state.생월 < 1  || state.생월 > 12 ) {
                    msgBirth = '태어난 월을 정확하게 입력해주세요.';
                    isBirth = true;
                }
                else {
                    if(state.생일===''){
                        msgBirth = '생일을 입력하세요';
                        isBirth = true; 
                    }
                    else if(state.생일 < 1  ||  state.생일 > 31 ) {
                        msgBirth = '태어난 일을 정확하게 입력해주세요.';
                        isBirth = true;
                    } 
                    else {
                        msgBirth = '';
                        isBirth = false;
                    }
                }
            }
        }

        setState({
            ...state,
            msgBirth: msgBirth,
            isBirth: isBirth
        })

    },[state.생년, state.생월, state.생일]);

    const onChangeChooga=(e)=>{

        if(e.target.value==="친구초대 추천인 아이디"){
            setState({
                ...state,
                추가입력사항: e.target.value,
                choogaPlaceholder: "추천인 아이디를 입력하세요"
            })
        }
        else{
            setState({
                ...state,
                추가입력사항: e.target.value,
                choogaPlaceholder: "참여 이벤트명을 입력하세요"
            })
        }
        
    }


    const chooChunIdCheck=()=>{

        // 반드시 폼데이터 생성 후 데이터 전송 해야한다.
        const formData = new FormData();
        formData.append('id', state.추천인아이디);

        axios({
            // url:'http://you19721.dothome.co.kr/front9_kurly/idCheckOk.php',
            url: `${state.url}/idCheckOk.php`,
            method:'POST',
            data: formData
        })
        .then((res)=>{

            if( res.data === 1 ){ // 중복된 아이디가 아니다.  1이면 중복
                confirmModalOpen('존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.');
            }
            else{
                confirmModalOpen('존재하지 않는 아이디 입니다.');
            }

        })
        .catch((err)=>{
            console.log(' AXIOS 오류! ');
        });

    }


    // 추천인아이디
    const onChangeChooChunId=(e)=>{
        setState({
            ...state,
            추천인아이디: e.target.value
        })
    }






    // 이용약관동의
    const onChangeCheckAll=(e)=>{
        if( e.target.checked === true){
            setState({
                ...state,
                이용약관동의: state.이용약관
            })
        }
        else{
            setState({
                ...state,
                이용약관동의: []
            })
        }
        
    }

    const onChangeCheck=(e)=>{
        
        let imsi = [];

        if( e.target.checked === true ){
            imsi = [...state.이용약관동의, e.target.value ] // 체크박스체크하면 기존 항목에 추가
        }
        else{        
            imsi = state.이용약관동의.filter((item)=>item!==e.target.value); //체크한 내용아닌것
        }

        setState({
            ...state,
            이용약관동의: imsi
        })
    }

    // 데이터 베이스 설계 및 구현
    // PHP & DB 연동 그리고 DB설계
    // AJAX REST API => 제이쿼리
    // AXIOS REST API => 리액트
    // 가입하기 버튼 클릭 온서브밋 폼전송 이벤트
    // 010-7942-5305 010-942-5305
   
    // 이용약관동의 필수 항목 체크 
    // 이용약관이 총 7개의 항목중 '필수' 문자가 포함된 항목이 있으면 1 아니면 0 을 배열속에 보관한다.
    const onSubmitSignup=(e)=>{
        e.preventDefault();

        const result = state.이용약관동의.map((item)=> item.includes('필수') ? 1 : 0);
        
        console.log( result );

        let sum = 0;
        result.map((item)=>{  // 결과 배열안에 모든 숫자를 sum에 누적시킨다.
            sum += item;
        });

        console.log( sum );


        if(state.아이디===''){ // 필수 입력상자 빈칸체크
            confirmModalOpen(`아이디를 입력하세요.`); 
        }
        else if(state.비밀번호===''){
            confirmModalOpen('비밀번호 입력하세요');
        }
        else if(state.이름===''){
            confirmModalOpen('이름 입력하세요');
        }
        else if(state.이메일===''){
            confirmModalOpen('이메일 입력하세요');
        }
        else if(state.휴대폰===''){
            confirmModalOpen('휴대폰 입력하세요');
        }
        else if(postAddr.주소1===''){
            confirmModalOpen('주소1 입력하세요');
        }
        else if(postAddr.주소2===''){
            confirmModalOpen('주소2 입력하세요');
        }
        else if(sum < 3){  // 필수선택이 3개
            confirmModalOpen('이용약관동의 필수 항목 3개를 선택하세요!');
        }
        else{  // 빈데이터가 없으면 전송

            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            let  newFormData  =  new FormData();
            newFormData.append('id', state.아이디);
            newFormData.append('pw', state.비밀번호);
            newFormData.append('name', state.이름);
            newFormData.append('email', state.이메일);
            newFormData.append('hp', state.휴대폰.replace(regExp, '$1-$2-$3'));
            newFormData.append('addr', `${postAddr.주소1} ${postAddr.주소2}` );
            newFormData.append('gender', state.성별);
            newFormData.append('birth', `${state.생년}-${state.생월}-${state.생일}`);
            newFormData.append('chooga', `${state.추가입력사항}, ${state.추천인아이디}`);
            newFormData.append('service', state.이용약관동의);

            axios({
                // url:'http://you19721.dothome.co.kr/front9_kurly/signup.php',
                url: `${ state.url }/signup.php`,
                method:'POST',
                data: newFormData
            })
            .then((res)=>{
                if(res.data===1){
                    confirmModalOpen(`마켓컬리 회원가입을 축하드리며 감사드립다.`); 
                    setTimeout(function(){
                        // 배포시 /main  맵핑이름 을 폴더로 인식하여 index.html을 찾는다 그래서 404.html 오류발생
                        // window.location.pathname = '/main'; // 라우터로 변경  네비게이터(Navigator) 사용
                        navigate('/main');
                    },1000);                    
                }
                else{
                    confirmModalOpen(`회원가입 입력데이터를 확인하고 다시 시도해주세요`); 
                }

            })
            .catch((err)=>{
                console.log(err);
            });
        }

           

    }

 





    return (
        <main id='mainSub5'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>회원가입</h2>
                            <p>
                                <i>*</i>필수 입력사항
                            </p>
                        </div>
                        <div className="content">
                            <form onSubmit={onSubmitSignup}>
                                <ul>
                                    <li className='row1'>
                                        <label className='label' htmlFor="userId">아이디<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='uwer_id' 
                                            id='userId' 
                                            placeholder='아이디를 입력해주세요' 
                                            onChange={onChangeEventId}
                                            value={state.아이디}
                                            maxLength={16}
                                        />
                                        <button onClick={onClickIdDepulicateOk}>중복확인</button>
                                        <p className='msg'>{state.msgId}</p>
                                    </li>
                                    <li className='row2'>
                                        <label className='label'  htmlFor="userpw1">비밀번호<i>*</i></label>
                                        <input 
                                            type="password" 
                                            name='uwer_pw1' 
                                            id='userPw1'  
                                            placeholder='비밀번호를 입력해주세요'  
                                            onChange={onChangeEventPw1}
                                            value={state.비밀번호}                                        
                                        />
                                        <p className='msg'>{state.msgPw}</p>
                                    </li>
                                    <li className='row3'>
                                        <label className='label'  htmlFor="userpw2">비밀번호확인<i>*</i></label>
                                        <input 
                                            type="password" 
                                            name='uwer_pw2' 
                                            id='userPw2'  
                                            placeholder='비밀번호를 한번더 입력해주세요'  
                                            onChange={onChangeEventPw2}
                                            value={state.비밀번호확인}
                                        />
                                        <p className='msg'>{state.msgPwOk}</p>
                                    </li>
                                    <li className='row4'>
                                        <label className='label'  htmlFor="userName">이름<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='uwer_name' 
                                            id='userName'  
                                            placeholder='이름을 입력해주세요'  
                                            onChange={onChangeEventName}
                                            value={state.이름}
                                        />
                                        <p className='msg'>{state.msgName}</p>
                                    </li>
                                    <li className='row5'>
                                        <label className='label'  htmlFor="userEmail">이메일<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name='uwer_email' 
                                            id='userEmail' 
                                            placeholder='이메일를 입력해주세요' 
                                            onChange={onChangeEventEmail}
                                            value={state.이메일}
                                        />
                                        <p className='msg'>{state.msgEmail}</p>
                                        <button onClick={emailDuplicateOk}>중복확인</button>
                                    </li>
                                    <li className='row6'>
                                        <label className='label'  htmlFor="userHp">휴대폰<i>*</i></label>
                                        <input  onChange={onChangeHp} maxLength={11} type="text" name='uwer_hp' id='userHp' placeholder='숫자만 입력해주세요' value={state.휴대폰} />
                                        <button  ref={refAuthBtn}  onClick={onClickHp} disabled={!state.isBtn}  className={`hp ${state.isBtn?'':'on'}`}>인증번호 받기</button>
                                        <p className='msg'>{state.msgHp}</p>
                                    </li>
                                    {
                                        state.휴대폰인증번호발급 > 0 &&
                                        <li className='row6 row6-2'>
                                            <input  onChange={onChangeHpAuthInput} maxLength={11} type="text" name='uwer_hp' id='userHp' placeholder='인증번호6자리입력' value={state.휴대폰인증번호입력} />
                                            <button onClick={onClickHpAuthBtnOk} disabled={!state.isAuthOk}    className={`hp ${state.isAuthOk?'':'on'}`}>인증번호 확인</button>                                    
                                        </li>
                                    }
                                    <li className='row7'>
                                        <label className='label'  htmlFor="userAddress">주소<i>*</i></label>                                    
                                        <button onClick={onClickAddress}  className={`address${postAddr.isAddress?' on':''}`}>{postAddr.isAddress?'재검색':'주소검색'}</button>
                                        {postAddr.isAddress && <input onChange={onChangeAddr1} type="text" name='address1' id='address1' value={postAddr.주소1} placeholder='주소1' />}
                                    </li>
                                    <li className='address row8'>
                                        {postAddr.isAddress && <input onChange={onChangeAddr2} type="text" name='address2' id='address2' value={postAddr.주소2} placeholder='주소2' />}
                                    </li>
                                    <li className='row9'>
                                        <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                    </li>
                                    <li className='row10'>
                                        <label className='label'>성별</label>
                                        <div className="radio-box">
                                            <label><input type="radio" name='male' id='male' value='남자'     onChange={onChangeGender} checked={state.성별.includes('남자')} /><span>남자</span></label>
                                            <label><input type="radio" name='female' id='female' value='여자' onChange={onChangeGender} checked={state.성별.includes('여자')} /><span>여자</span></label>
                                            <label><input type="radio" name='none' id='none' value='선택안함'  onChange={onChangeGender} checked={state.성별.includes('선택안함')}  /><span>선택안함</span></label>
                                        </div>

                                    </li>
                                    
                                    <li className='row11'>
                                        <label className='label' >생년월일</label>
                                        <div className="date-box">
                                            <input onChange={onChangeYear} type="text" name='year' id='year' value={state.생년} placeholder='YYYY' /><i>/</i>
                                            <input onChange={onChangeMonth} type="text" name='month' id='month' value={state.생월} placeholder='MM' /><i>/</i>
                                            <input onChange={onChangeDate} type="text" name='date' id='date' value={state.생일} placeholder='DD' />
                                        </div>
                                        <p className='msg'>{state.msgBirth}</p>
                                    </li>
                                
                                    <li  className='row12'>
                                        <label className='label'>추가입력 사항</label>
                                        <div className="radio-box">
                                            <label><input type="radio" name='chooga' id='chooga1' onChange={onChangeChooga} value='친구초대 추천인 아이디' checked={state.추가입력사항.includes("친구초대 추천인 아이디")} /><span>친구초대 추천인 아이디</span></label>
                                            <label><input type="radio" name='chooga' id='chooga2' onChange={onChangeChooga} value='참여 이벤트명' checked={state.추가입력사항.includes("참여 이벤트명")}  /><span>참여 이벤트명</span></label>
                                        </div>
                                    </li>

                                { 
                                    state.추가입력사항 !=='' &&  <>
                                            <li  className='row13'>
                                                <input type="text" onChange={onChangeChooChunId}  name='choochun_id' id='choochunId' value={state.추천인아이디} placeholder={state.choogaPlaceholder}  />
                                                <button onClick={chooChunIdCheck}>아이디 확인</button>
                                            </li>
                                            <li>
                                                <p>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>
                                            </li>
                                        </>
                                    }

                                    <li className='row14'>
                                        <label className='label'>이용약관동의<i>*</i></label>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chkAll' id='chkAll' value='전체 동의합니다.' onChange={onChangeCheckAll}  checked={state.이용약관동의.length===7} /><span>전체 동의합니다.</span></label>    
                                        </div>                                    
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk1' id='chk1' value='이용약관 동의(필수)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("이용약관 동의(필수)")} /><span>이용약관 동의</span></label><em>(필수)</em>
                                        </div>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk2' id='chk2' value='개인정보 수집∙이용 동의(필수)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(필수)")}   /><span>개인정보 수집∙이용 동의</span></label><em>(필수)</em>
                                        </div>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk3' id='chk3' value='개인정보 수집∙이용 동의(선택)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(선택)")}  /><span>개인정보 수집∙이용 동의</span></label><em>(선택)</em>
                                        </div>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk4' id='chk4' value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)")}  /><span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span></label><em>(선택)</em>
                                        </div>
                                        <div className='service sms'>
                                            <label><input type="checkbox" name='chk5' id='chk5' value='SNS(선택)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("SNS(선택)")}   /><span>SMS</span></label>
                                            <label><input type="checkbox" name='chk6' id='chk6' value='이메일(선택)' onChange={onChangeCheck}   checked={state.이용약관동의.includes("이메일(선택)")} /><span>이메일</span></label>
                                            <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                        </div>
                                        <div className='service'>
                                            <label><input type="checkbox" name='chk7' id='chk7' value='본인은 만 14세 이상입니다.(필수)' onChange={onChangeCheck}  checked={state.이용약관동의.includes("본인은 만 14세 이상입니다.(필수)")}  /><span>본인은 만 14세 이상입니다.</span></label><em>(필수)</em>
                                        </div>

                                    </li>

                                </ul>

                                <div className="button-box">
                                    <button type='submit'>가입하기</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>           
        </main>
    );
};


Sub5SingupComponent.defaultProps = {
    회원가입 : {
        url:'https://you19721.com/front9_kurly',
        // url:process.env.PUBLIC_URL,
        아이디: '',
        msgId: '',
        아이디중복확인: false,
        
        비밀번호: '',
        msgPw: '',
        
        비밀번호확인: '',
        msgPwOk: false,
        
        이름: '',
        msgName: false,
        
        이메일: '',
        이메일중복확인: false,
        msgEmail: false,
        
        휴대폰: '',
        휴대폰인증번호발급: '',
        휴대폰인증번호입력: '',
        msgHp: '',
        isBtn: false,
        isAuthOk: false,
        다른번호인증: false,
        
        주소1: '',
        주소2: '',
        msgAddr: false,
        isAddress: false,

        
        성별: '선택안함',
        
        생년: '',
        생월: '',
        생일: '',
        msgBirth:'',
        isBirth: false,
        
        추가입력사항: '',
        추천인아이디: '',
        
        
        이용약관동의: [],
        이용약관:[
          "이용약관 동의(필수)",
          "개인정보 수집∙이용 동의(필수)",
          "개인정보 수집∙이용 동의(선택)",
          "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
          "SNS(선택)",
          "이메일(선택)",
          "본인은 만 14세 이상입니다.(필수)",
        ]
        // 필수항목 3개 
        
    }
}

