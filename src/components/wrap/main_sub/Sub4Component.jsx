import React from 'react';
import axios from 'axios';
import './scss/sub4.scss';

export default function Sub4Component() {


    const [product, setProduct] = React.useState([]);

    React.useEffect(()=>{
        // 신상품
        axios({
            url:'./data/sub/sub4.json',
            method: 'GET'
        })
        .then((res)=>{           
            if(res.status===200){
                setProduct(res.data.특가혜택);
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]); //로딩시



    return (
        <main id='mainSub4'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>특가혜택</h2>
                        </div>
                        <div className="content">
                            <ul>
                                    { 

                                        product.map((item, idx)=>{
                                            return(
                                                <li key={idx}>
                                                    <div className="gap">
                                                        <a href="!#">
                                                        <img src={`./images/sub/sub04/${item.src}`} alt="" />                                                                                                               
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
            </section>
           
        </main>
    );
};