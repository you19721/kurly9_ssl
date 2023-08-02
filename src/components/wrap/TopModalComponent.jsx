import React from 'react';

export default function TopModalComponent({setTopModalClose}) {
   
    const onClickTopModalClose=(e)=>{
        e.preventDefault();
        setTopModalClose('YES', 3); // 부모 컴폰넌트의 닫기 함수
    }

    return (
        <div id='topModal'>
            <div className="container">
                <div className="content">
                    <a href="!#">
                        <h2>지금 가입하고 인기상품<strong>100원</strong>에 받아가세요!</h2>
                        <span onClick={onClickTopModalClose}><img src="./images/intro/icon_close.svg" alt="" /></span>
                    </a>    
                </div>    
            </div>   
        </div>
    );
};