import React from 'react';
import './scss/confirm.scss';
import { GlobalContext } from '../context/GlobalContext';


export default function ConfirmModalComponent () {

    const {confirmModalClose, modal} = React.useContext(GlobalContext);

    const onClickConfirmModalClose=(e)=>{
        e.preventDefault();
        confirmModalClose(); // 모달닫기 함수 실행
    }

    return (
        <div id='confirmModal'>
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="text-box">
                            <h2>{modal.msg}</h2>
                        </div>
                        <div className="button-box">
                            <button onClick={onClickConfirmModalClose}>확인</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    );
};
