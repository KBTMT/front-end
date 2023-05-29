import React, { useState, useEffect } from "react";
import "./Financialnews.css";
import axios from 'axios';

const Financialnews = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8899/finance')
      .then(response => setNewsList(response.data))
      .catch(error => console.log(error))
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 번째 페이지로 이동
  };

  // 선택된 카테고리에 따라 뉴스를 필터링
  const filteredNews = selectedCategory
    ? newsList.filter((news) => news.category === selectedCategory)
    : newsList;

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const pageNumbers = Math.ceil(filteredNews.length / newsPerPage);
  const pagination = [];

  const category = {
    1 : '금융',
    2 : '증권',
    3 : '산업/재계',
    4 : '중기/벤처',
    5 : '부동산',
    6 : '글로벌 경제',
    7 : '생활경제',
    8 : '경제 일반'
  }
  for (let i = 1; i <= pageNumbers; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }
  const handleNewsClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="news-container">
      <div className="news-header">
        <h1>오늘의 경제 키워드</h1>
      </div>
      <div className="news-list">
        {currentNews.map((news) => (
          <div className="news-item" key={news.id} onClick={() => handleNewsClick(news.financialUrl)}>
            <h2>{news.financialKeyword}</h2>
            <p>{category[news.financeCat]}</p>
            <p>{news.financialSummary}</p>
          </div>
        ))}
      </div>
      <div className="pagination">{pagination}</div>
    </div>
  );
};

export default Financialnews;
