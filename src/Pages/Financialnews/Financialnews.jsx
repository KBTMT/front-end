import React, { useState } from "react";
import "./Financialnews.css";

const Financialnews = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [newsList, setNewsList] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:8899/finance')
  //     .then(response => setNewsList(response.data))
  //     .catch(error => console.log(error))
  // }, []);
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: "뉴스 제목 1",
      content: "짧은 내용 1",
      image: "이미지 URL 1",
      date: "2023-05-15",
      category: "카테고리 1"
    },
    {
      id: 2,
      title: "뉴스 제목 2",
      content: "짧은 내용 2",
      image: "이미지 URL 2",
      date: "2023-05-16",
      category: "카테고리 2"
    },
    {
      id: 3,
      title: "뉴스 제목 3",
      content: "짧은 내용 3",
      image: "이미지 URL 3",
      date: "2023-05-16",
      category: "산업/재계"
    },
    {
      id: 4,
      title: "뉴스 제목 4",
      content: "짧은 내용 4",
      image: "이미지 URL 4",
      date: "2023-05-16",
      category: "카테고리 4"
    },
    {
      id: 5,
      title: "뉴스 제목 5 ",
      content: "짧은 내용 2",
      image: "이미지 URL 2",
      date: "2023-05-16",
      category: "카테고리 2"
    },
    {
      id: 6,
      title: "뉴스 제목 6",
      content: "짧은 내용 6",
      image: "이미지 URL 6",
      date: "2023-05-16",
      category: "금융"
    },
    {
      id: 7,
      title: "뉴스 제목 7",
      content: "짧은 내용 7",
      image: "이미지 URL 7",
      date: "2023-05-16",
      category: "금융"
    }
  ]);

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

  return (
    <div className="news-container">
      <div className="news-header">
        <h2>뉴스</h2>
        <div className="category-menu">
          <ul>
            <li
              className={selectedCategory === "" ? "active" : ""}
              onClick={() => handleCategorySelect("")}
            >
              전체
            </li>
            <li
              className={selectedCategory === "금융" ? "active" : ""}
              onClick={() => handleCategorySelect("금융")}
            >
              금융
            </li>
            <li
              className={selectedCategory === "증권" ? "active" : ""}
              onClick={() => handleCategorySelect("증권")}
            >
              증권
            </li>
            <li
              className={selectedCategory === "산업/재계" ? "active" : ""}
              onClick={() => handleCategorySelect("산업/재계")}
            >
              산업/재계
            </li>
            <li
              className={selectedCategory === "중기/벤처" ? "active" : ""}
              onClick={() => handleCategorySelect("중기/벤처")}
            >
              중기/벤처
            </li>
            <li
              className={selectedCategory === "부동산" ? "active" : ""}
              onClick={() => handleCategorySelect("부동산")}
            >
              부동산
            </li>
            <li
              className={selectedCategory === "글로벌경제" ? "active" : ""}
              onClick={() => handleCategorySelect("글로벌경제")}
            >
              글로벌경제
            </li>
            <li
              className={selectedCategory === "생활경제" ? "active" : ""}
              onClick={() => handleCategorySelect("생활경제")}
            >
              생활경제
            </li>
            <li
              className={selectedCategory === "경제 일반" ? "active" : ""}
              onClick={() => handleCategorySelect("경제 일반")}
            >
              경제 일반
            </li>
          </ul>
        </div>
      </div>
      <div className="news-list">
        {currentNews.map((news) => (
          <div className="news-item" key={news.id}>
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            <p>{news.category}</p>
            <p>작성일: {news.date}</p>
          </div>
        ))}
        {/* {currentNews.map((news) => (
          <div className="news-item" key={news.id}>
            <img src={news.image} alt={news.title} />
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            <p>{news.category}</p>
            <p>작성일: {news.date}</p>
          </div>
        ))} */}
      </div>
      <div className="pagination">{pagination}</div>
    </div>
  );
};

export default Financialnews;
