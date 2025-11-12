import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../Services/Answer";
import { getQuestionsIdTopic } from "../../Services/Question";
import "../../Sass/form-quzzi.scss";
import "../../Sass/result.scss";
function Result() {
    const param = useParams();
    const [dataResult, setDataResult] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetData = async () => {
            const dataAnswers = await getAnswers(param.id);
            const dataQuestions = await getQuestionsIdTopic(
                dataAnswers[0].topicId
            );
            const dataAnswersMap = dataAnswers[0].answers.reduce(
                (acc, item) => {
                    acc[item.questionId] = item;
                    return acc;
                },
                {}
            );
            const mergedAnswerForQuestions = dataQuestions.map((ans) => ({
                ...ans,
                answer: dataAnswersMap[String(ans.id)]?.answer,
            }));

            setDataResult(mergedAnswerForQuestions);
        };
        fetData();
    }, []);

    const quantitySentenceCorrect = dataResult.reduce((quantity, item) => {
        if(item.answer === item.correctAnswer) return quantity+= 1
        else return quantity
    }, 0)
    return (
        <>
            <section className="result">
                <h2 className="result__heading">Kết Quả</h2>
                <div className="result__form">
                    <div className="result__summary-wrap">
                        <div className="result__summary">
                            <p className="result__correct">Đúng : {quantitySentenceCorrect}</p>
                            <p className="result__false">Sai : {dataResult.length - quantitySentenceCorrect}</p>
                        </div>

                        <p className="result__mark">Điểm : {(quantitySentenceCorrect / dataResult.length * 10).toFixed(2)}</p>
                        
                    </div>
                    <form className="form-quzzi">
                        {dataResult.map((question, index) => (
                            <div className="form-quzzi__item" key={index}>
                                <p className="form-quzzi__question">
                                    Câu {index + 1} : {question.question}
                                    {question.correctAnswer ===
                                    question.answer ? (
                                        <>
                                            <span className="result__check result__check--correct">
                                                Đúng
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="result__check result__check--false">
                                                Sai
                                            </span>
                                        </>
                                    )}
                                </p>
                                {question.answers.map((answer, indexans) => {
                                    let classNameStatus = "";
                                    let checked = false;
                                    if(indexans === question.correctAnswer) {
                                        classNameStatus = "result__item--correct";
                                    }
                                    if (question.answer === indexans) {
                                        checked = true;
                                        // Nếu câu chọn đúng
                                        if (question.answer !== question.correctAnswer) {
                                            classNameStatus =
                                                "result__item--wrong";
                                        }
                                    }
                                    return (
                                        <>
                                            <div
                                                key={indexans}
                                                className="form-quzzi__option"
                                            >
                                                <input
                                                    type="radio"
                                                    className="form-quzzi__radio"
                                                    checked={checked}
                                                    disabled
                                                />
                                                <label
                                                    htmlFor={`quzzi-${question.id}-${indexans}`}
                                                    className={`form-quzzi__text ${classNameStatus}`}
                                                >
                                                    {answer}
                                                </label>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        ))}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Result;
