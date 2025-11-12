import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicId } from "../../Services/Topic";
import { getQuestionsIdTopic } from "../../Services/Question";
import { getUser } from "../../Utils/Cookie";
import { getAnswersByUser, postAnswerByUser } from "../../Services/Quzzi";
import { Modal } from "antd";
import "../../Sass/form-quzzi.scss";
import "../../Sass/quzzi.scss";
function Quzzi() {
    const navigate = useNavigate();
    const param = useParams();
    const [dataTopicId, setDataTopicId] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getTopicId(param.id);
            setDataTopicId(response);
        };
        fetchData();
    }, []);

    const [questionsIdTopic, setQuestionsIdTopic] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getQuestionsIdTopic(param.id);
            setQuestionsIdTopic(response);
        };
        fetchData();
    }, []);

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const handleConfirmSubmit = async () => {
        setConfirmLoading(true);
        const form = document.querySelector(".form-quzzi");
        const selectAnswersByUser = [];

        for (let i = 0; i < form.elements.length - 1; i++) {
            const selectAnswers = form.elements[i];
            if (selectAnswers.checked) {
                const name = selectAnswers.name;
                const answerByUser = selectAnswers.value;
                selectAnswersByUser.push({
                    questionId: parseInt(name),
                    answer: parseInt(answerByUser),
                });
            }
        }

        const data = await getAnswersByUser();
        const dataAnswers = {
            id: data.length + 1,
            userId: parseInt(getUser().id),
            topicId: parseInt(param.id),
            answers: selectAnswersByUser,
        };

        const response = await postAnswerByUser(dataAnswers);
        if (response) {
            setTimeout(() => {
                setConfirmLoading(false);
                setOpenModal(false);
                navigate(`/result/${dataAnswers.id}`);
            }, 2000);
        }
    };

    return (
        <>
            <section className="quzzi">
                <h2 className="quzzi__heading">
                    Chủ Đề Câu Hỏi : {dataTopicId.name}
                </h2>
                <div className="quzzi__form">
                    <form className="form-quzzi" onSubmit={handleSubmit}>
                        {questionsIdTopic.map((question, index) => (
                            <div className="form-quzzi__item" key={index}>
                                <p className="form-quzzi__question">
                                    Câu {index + 1} : {question.question}
                                </p>

                                {question.answers.map((answer, indexans) => (
                                    <div
                                        key={indexans}
                                        className="form-quzzi__option"
                                    >
                                        <input
                                            type="radio"
                                            name={question.id}
                                            id={`quzzi-${question.id}-${indexans}`}
                                            value={indexans}
                                            className="form-quzzi__radio"
                                        />
                                        <label
                                            htmlFor={`quzzi-${question.id}-${indexans}`}
                                            className="form-quzzi__text"
                                        >
                                            {answer}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button type="submit" className="form-quzzi__btn">
                            Nộp Bài
                        </button>
                    </form>
                </div>
            </section>

            <Modal
                title="Bạn muốn xác nhận nộp bài?"
                open={openModal}
                onOk={handleConfirmSubmit}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <p>Bạn có chắc chắn muốn nộp bài không?</p>
            </Modal>
        </>
    );
}

export default Quzzi;
