import React, { useState, useEffect } from "react";
import "./Financialnews.css";
import axios from 'axios';

const Financialnews = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8899/finance')
      .then(response => {
        setNewsList(response.data)
        console.log(newsList);
      })
      .catch(error => console.log(error))
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 따라 뉴스를 필터링
  const filteredNews = selectedCategory
    ? newsList.filter((news) => news.category === selectedCategory)
    : newsList;

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

  const handleNewsClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>오늘의 경제 키워드</h1>
      </div>
      <div className="news-list">
        {filteredNews.map((news) => (
          <div className="news-item" key={news.id} onClick={() => handleNewsClick(news.financialUrl)}>
            <p className="news-keyword">{news.financialKeyword}</p>
            <p className="news-cat">{category[news.financeCat]}</p>
            <p>{news.financialSummary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Financialnews;
