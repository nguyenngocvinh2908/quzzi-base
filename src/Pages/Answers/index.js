import { useEffect, useState } from "react"
import { getAnswersByUserId } from "../../Services/Answer";
import { getUser } from "../../Utils/Cookie";
import { getTopic } from "../../Services/Topic";
import { NavLink } from "react-router-dom";
import "../../Sass/answers.scss"

function Answers() {
    const [mergedAnswerTopic, setMergedAnswerTopic] = useState([]);
    const userId = getUser();
    useEffect(() => {
        const fetchData = async () => {
            const answersByUserId = await getAnswersByUserId(userId.id);
            const topics = await getTopic();

            const topicMap = topics.reduce((acc, t) => {
                acc[t.id] = t;
                return acc;
            }, {});
            const mergedAnswerTopic = answersByUserId.map(ans => ({
                ...ans,
                name: topicMap[String(ans.topicId)]?.name || "",
                desc: topicMap[String(ans.topicId)]?.desc || ""
            }));
            
            setMergedAnswerTopic(mergedAnswerTopic.reverse());            
        }
        fetchData();
    }, [userId.id]);

    return (
        <>
            <section className="answers">
                <div className="answers__banner">
                    <h2 className="answers__heading">Tổng hợp các câu trả lời</h2>
                    <p className="answers__desc">
                        Dưới đây là danh sách chủ đề bạn đã hoàn thành hoặc có câu trả lời. Chọn “See Details” để xem chi tiết kết quả.
                    </p>
                </div>

                {mergedAnswerTopic.length > 0 ? (
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
                                {mergedAnswerTopic.map((answerTopic) => (
                                    <tr className="table__row table__row--hover" key={answerTopic.id}>
                                        <td className="table__column">{answerTopic.id}</td>
                                        <td className="table__column">{answerTopic.name}</td>
                                        <td className="table__column">
                                            <NavLink className="table__link" to={`/result/${answerTopic.id}`}>See Details</NavLink>
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
 
export default Answers