import { Button } from "antd";
import React, { useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { timeUp } from "../../redux/Score/action";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(timeUp(false));
  });
  return (
    <div className="parent">
      <div className="rule">
        <h3 className="rule-title">Some rule of this Quiz</h3>
        <ol>
          <li className="rule-element">
            You will have only 30 seconds for total Quiz
          </li>
          <li className="rule-element">
            Once you select your answer, it can be undone
          </li>
          <li className="rule-element">
            You can't select any option one time goes off
          </li>
          <li className="rule-element">
            You can't exit from the Quiz while you are playing
          </li>
          <li className="rule-element">
            You will get points on the basis of your correct answers
          </li>
        </ol>
      </div>

      <Button
        type="primary"
        onClick={() => navigate("/question")}
        className="button"
      >
        Start Quiz
      </Button>
    </div>
  );
}
export default Home;
