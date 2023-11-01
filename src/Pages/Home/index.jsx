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
        <h3 className="rule-title">Một vài luật của bài kiểm tra</h3>
        <ol>
          <li className="rule-element">
            Số câu hỏi 25 câu / 1 đề.
          </li>
          <li className="rule-element">
            Thời gian làm bài 19 phút.
          </li>
          <li className="rule-element">
            Điểm đạt: 21 câu đúng / 25 câu.
          </li>
          <li className="rule-element">
            Mỗi câu đúng tương ứng với 1 điểm.
          </li>
          <li className="rule-element">
            Bạn chỉ được xem lại bài 1 lần.
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
