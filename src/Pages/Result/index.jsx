import { useNavigate } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Radio, Space } from "antd";
import { LIST_IMG } from "../../constants/List";

export default function Result() {
  // const score = useSelector((state) => state.scoreReducer.score);
  // const incorrect = useSelector((state) => state.scoreReducer.incorrect);
  // const correct = useSelector((state) => state.scoreReducer.correct);
  const [result, setResult] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/test/show-test-results/1"
        );
        const responseData = await response.json();
        setResult(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (result) {
    console.log(result);
  }
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="container-result">
        <div className="title">
          <h2>Congratulation! Here is your result </h2>
        </div>
        <div className="">
          {result ? (
            <div className="custom-text ">
              <div className="child-question1">
                <p>Total scores : {result.testResults.score} </p>
                <p>
                  The number of true sentences:{" "}
                  {result.testResults.numberOfCorrect}{" "}
                </p>
                <p>
                  The number of false sentences:{" "}
                  {result.testResults.numberOfIncorrect}{" "}
                </p>
                <p>
                  Result: {result.testResults.isPass === true ? "Đạt" : "Tạch"}{" "}
                </p>
              </div>
              <div>
                <div>
                  {result.reviewTestList.map((ans, index) => (
                    <div key={index} className="child-question1">
                      <span className="question1 ">
                        Question {index + 1} : {ans.questionText}
                      </span>
                      <div>
                        <img src={LIST_IMG[index].img} />
                      </div>
                      <Radio.Group
                        defaultValue={ans.answerText}
                        value={ans.answerText}
                      >
                        <Space direction="vertical">
                          {ans.answerChoices.map((choice, index) => (
                            <Radio
                              key={index}
                              value={choice.answerText}
                              className="list-answer"
                            >
                              {choice.answerText}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                      {
                        ans.answerText != null ? (
                          <div className="user-answer">
                            Đáp án của bạn là: {ans.answerText}
                          </div>
                        ) : null
                      }
                      
                        {ans.isCorrect ? (
                        <div className="custom-ans-correct">
                          Bạn đã trả lời đúng
                        </div>
                      ) : (
                        <div className="custom-ans-incorrect">
                          Bạn trả lời sai! Đáp án đúng là: {ans.correctAnswer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="lds-ring">
              <div></div>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/")} className="button-home">
          Thoát
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <CaretLeftOutlined className="icon-home" />
        </button>
      </div>
    </div>
  );
}
