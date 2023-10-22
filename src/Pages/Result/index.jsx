import { useNavigate } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

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
    <div className="container-result">
      <div className="title">
        <h2>Congratulation! Here is your result </h2>
      </div>
      <div className="child-result">
        {result ? (
          <div className="custom-text">
            <p>Total scores : {result.score} </p>
            <p>The number of true sentences: {result.numberOfCorrect} </p>
            <p>The number of false sentences: {result.numberOfIncorrect} </p>
          </div>
        ) : (
          <div className="lds-ring">
            <div></div>
          </div>
        )}
      </div>
      <button onClick={() => navigate("/")} className="button-home">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <CaretLeftOutlined className="icon-home" />
      </button>
    </div>
  );
}
