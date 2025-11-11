import "../../Sass/home.scss"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopic } from "../../Services/Topic";
function Home() {

  const [dataTopics, setDataTopics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await getTopic();
        setDataTopics(response);
    }
    fetchData();
  }, [])

  return (
    <div className="home">
      {/* Banner */}
      <section className="home__banner">
        <div className="home__content">
          <h1 className="home__title">Chào mừng đến với <span>Quzzi</span></h1>
          <p className="home__subtitle">
            Ứng dụng trắc nghiệm hiện đại giúp bạn rèn luyện kiến thức và kỹ năng mỗi ngày.
          </p>
          <NavLink to="/topic" className="home__button">Bắt đầu ngay</NavLink>
        </div>
      </section>

      {/* Danh sách chủ đề */}
      <section className="home__topics">
        <h2 className="home__heading">Chủ đề nổi bật</h2>
        <div className="home__grid">
          {dataTopics.map(topic => (
            <div key={topic.id} className="home__card">
              <h3>{topic.name}</h3>
              <p>{topic.desc}</p>
              <NavLink to="/topic" className="home__link">Làm bài ngay →</NavLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
