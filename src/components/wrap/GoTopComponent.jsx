import React from 'react';
import goTop from './img/gotop.png';
import './scss/gotop.scss';

export default function GoTopComponent() {

    const [isGoTop, setIsGoTop] = React.useState(false);


    React.useEffect(()=>{
        window.addEventListener('scroll', function(){
            let isGoTop = false;

            if( window.scrollY > 969 ){
                isGoTop = true;
            }
            else{
                isGoTop = false;
            }

            setIsGoTop(isGoTop);

        });
    });

    return (
        <div id='goTop' className={isGoTop ? 'on':''}>
            <a href="#wrap"><img src={goTop} alt="" /></a>
        </div>
    );
};