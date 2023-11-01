/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { Button, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import Countdown from "../../components/Time";
import { LIST_IMG } from "../../constants/List";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const [values, setValues] = useState([]);
  const [cut, setCut] = useState(0);

  useEffect(() => {
    // Chạy hàm sau khi fetch dữ liệu và có giá trị trong data
    if (data) {
      const newValues = data.map((dt, index) => ({
        questionId: dt.question.questionId,
        questionText: dt.question.questionText,
        testNumber: dt.question.testNumber,
        answerId: "",
        isCorrect: "",
        answerChoicesText: "",
      }));
      setValues(newValues);
    }
  }, [data]);

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
  // console.log(LIST);
  const onSubmit = () => {
    fetch("http://localhost:8080/test/choice-of-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        navigate("/result");
      })
      .catch((error) => console.error("error", error));
  };

  const Next = () => {
    setCut(cut + 1);
  };
  const Previous = () => {
    setCut(cut - 1);
  };

  const timeUp = useSelector((state) => state.scoreReducer.timeUp);
  useEffect(() => {
    if (timeUp === true) {
      onSubmit();
    }
  }, [timeUp]);
  return (
    <div className="container-question">
      {data ? (
        <div className="child-question">
          <div className="header">
            <h1 className="indication fixed-css-top-left ">
              {cut + 1} of {data.length} questions
            </h1>
            <div className="fixed-css-top-right">
              <Countdown seconds={1140} />
            </div>
          </div>
          <span className="question">
            Question {cut + 1} : {data[cut].question.questionText}
          </span>
          <img alt = "anh-bien-bao" className="img-style" src={LIST_IMG[cut].img} />
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

          <div className="footer">
            <Button
              type="primary fixed-css-previous"
              onClick={Previous}
              className={
                // cut === 0 ? "custom-button-disable" : "custom-button-1"
                cut === 0 ? "custom-button-1" : "custom-button-1"
              }
              disabled={cut === 0 ? true : false}
            >
              Previous Page
            </Button>
            {cut !== data.length - 1 ? (
              <Button
                type="primary fixed-css-next"
                onClick={Next}
                className="custom-button-1"
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary fixed-css-next"
                onClick={onSubmit}
                className="custom-button-1"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="lds-heart">
          <div></div>
        </div>
      )}
    </div>
  );
}
