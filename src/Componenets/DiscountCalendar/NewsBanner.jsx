import React, { useState, useEffect } from "react";
import axios from 'axios';
import './NewsBanner.css';
import { Link } from 'react-router-dom';
const NewsBanner = () => {
    const [newsList, setNewsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const category = {
        1: '금융',
        2: '증권',
        3: '산업/재계',
        4: '중기/벤처',
        5: '부동산',
        6: '글로벌 경제',
        7: '생활경제',
        8: '경제 일반'
    };

    useEffect(() => {
        axios.get('http://localhost:8899/finance')
            .then(response => {
                setNewsList(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === newsList.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsList.length - 1 : prevIndex - 1));
    };

    const currentNews = newsList[currentIndex];

    return (
        <div className="newsBannerContainer">
            <h2>오늘의 금융 시사 키워드</h2>
            <Link to="/financialnews">
            {currentNews && (
                <div className="slider-container">
                    <div className="slider">
                        <div className="slide active">
                            <p className="keyword" style={{ paddingBottom : "10px", width : "80%"}}>{currentNews.financialKeyword}</p>
                            <p className="newsContent" style={{paddingBottom : "20px"}}>{category[currentNews.financeCat]}</p>
                        </div>
                    </div>
                    <button className="finance-slider-button prev" onClick={handlePrevSlide}>
                        이전
                    </button>
                    <button className="finance-slider-button next" onClick={handleNextSlide}>
                        다음
                    </button>
                </div>
            )}
            </Link>
        </div>
    );
};

export default NewsBanner;
