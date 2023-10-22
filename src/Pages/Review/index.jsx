/* eslint-disable no-const-assign */
import { Button, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import Countdown from "../../components/Time";
import { LIST_IMG } from "../../constants/List";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addScore, correct, incorrect } from "../../redux/Score/action";

export default function Questions() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/test/list-question"
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (data) {
  }

  const [values, setValues] = useState(Array.from({ length: 25 }, () => ({})));
  const [cut, setCut] = useState(0);

  // const dispatch = useDispatch();
  const onChange = (e) => {
    const newValue = [...values];
    newValue[cut] = {
      questionId: e.target.questionId,
      questionText: e.target.questionText,
      answerId: e.target.answerId,
      isCorrect: e.target.isCorrect,
      testNumber: e.target.testNumber,
      answerChoicesText: e.target.answerChoicesText,
    };

    setValues(newValue);
    console.log(values);
  };

  return (
    <div className="container-question">
      {data ? (
        <div className="child-question">
          <div className="header">
            <h1 className="indication fixed-css-top-left ">
              {cut + 1} of {data.length} questions
            </h1>
            <div className="fixed-css-top-right">
              <Countdown seconds={300} />
            </div>
          </div>
          <span className="question">
            Question {cut + 1} : {data[cut].question.questionText}
          </span>
          <img className="img-style" src={LIST_IMG[cut].img} />
          <Radio.Group
            onChange={onChange}
            value={values[cut]?.answerChoicesText || undefined}
          >
            <Space direction="vertical">
              {data[cut].answerChoicesDTOList.map((choice, index) => (
                <Radio
                  key={index}
                  value={choice.answerText}
                  questionId={choice.questionId}
                  questionText={data[cut].question.questionText}
                  answerId={choice.answerId}
                  answerChoicesText={choice.answerText}
                  isCorrect={choice.isCorrect}
                  testNumber={data[cut].question.testNumber}
                  className="list-answer"
                >
                  {choice.answerText}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      ) : (
        <div className="lds-heart">
          <div></div>
        </div>
      )}
    </div>
  );
}
