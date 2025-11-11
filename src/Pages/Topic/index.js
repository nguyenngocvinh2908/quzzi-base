import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import { getTopic } from "../../Services/Topic";
import "../../Sass/topic.scss"
import "../../Sass/table.scss"

function Topic() {
    const [dataTopics, setDataTopics] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
            const response = await getTopic();
            setDataTopics(response);
        }
        fetchData();
      }, [])
    return (
        <>
            <section className="topic">
                <div className="topic__banner">
                    <h2 className="topic__heading">Khám phá các chủ đề trắc nghiệm</h2>
                    <p className="topic__desc">
                    Rèn luyện kiến thức qua các bài trắc nghiệm thú vị về HTML, CSS,
                    JavaScript, React, Node.js và nhiều hơn nữa.
                    </p>
                </div>

                {dataTopics.length > 0 ? (
                    <>
                        <table className="table">
                            <thead className="table__thead">
                                <tr className="table__row">
                                    <th className="table__column">ID</th>
                                    <th className="table__column">Tên Chủ Đề</th>
                                    <th className="table__column">Link Truy Cập</th>
                                </tr>
                            </thead>

                            <tbody className="table__tbody">
                                {dataTopics.map((topic) => (
                                    <tr className="table__row table__row--hover" key={topic.id}>
                                        <td className="table__column">{topic.id}</td>
                                        <td className="table__column">{topic.name}</td>
                                        <td className="table__column">
                                            <NavLink className="table__link" to={`/quzzi/${topic.id}`}>Go To</NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <p className="topic__error">Không có chủ đề nào được tìm thấy.</p>
                    </>
                )}
            </section>
        </>
    )
}
 
export default Topic

