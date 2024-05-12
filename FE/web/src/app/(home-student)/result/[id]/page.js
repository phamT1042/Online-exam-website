"use client";
import React, { useState, useEffect } from "react";
import { Layout, Card, Typography, Button, Spin, Radio } from "antd";
import { useParams } from "next/navigation";

const { Header, Content } = Layout;
const { Text } = Typography;

const ResultPage = ({ result }) => {
  const [pass, setPass] = useState(result.score >= 4);

  return (
    <Layout>
      <Content
        style={{
          textAlign: "justify",
          minHeight: 120,
          lineHeight: "120px",
          color: "black",
          backgroundColor: "#EEEEEE",
          padding: 24,
          overflowY: "auto",
          marginBottom: "200px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              padding: "10px",
              border: "1px solid #AAA",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{result.exam}</h3>
            <h3 style={{ marginBottom: "10px" }}>MSV: {result.username}</h3>
            <h3 style={{ marginBottom: "10px" }}>
              Họ và Tên: {result.fullName}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>Môn: {result.name}</h3>
            <h3 style={{ marginBottom: "10px" }}>Điểm: {result.score}</h3>
            <h3 style={{ marginBottom: "10px" }}>
              Số câu trả lời đúng: {result.scoreRatio}
            </h3>
          </div>
          <h3 style={{ marginBottom: "20px", textAlign: "left" }}>Đáp án:</h3>
          {result.questions.map((question, index) => (
            <Card
              key={index}
              title={`Question ${index + 1}`}
              style={{ width: "100%", marginBottom: 16, textAlign: "left" }}
            >
              <p>{question.questionText}</p>
              <Radio.Group
                defaultValue={result.choices && result.choices[index]}
                disabled
              >
                {question.options.map((option, optionIndex) => {
                  const userChoice = result.choices && result.choices[index];
                  console.log(result.choices && result.choices[index]);
                  const ans = ["A", "B", "C", "D"];
                  console.log("option:" ,option, optionIndex, userChoice, ans[optionIndex]);
                  var check =  userChoice===ans[optionIndex];
                  
                  console.log("check:", check);
                  return (
                    <Radio
                      key={optionIndex}
                      value={option}
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "black",
                        backgroundColor: "transparent",
                      }}
                      checked={check}
                    >
                      {option}
                    </Radio>
                  );
                })}
              </Radio.Group>
              <p
                style={{
                  color:
                    result.choices &&
                    result.choices[index] === question.correctOption
                      ? "green"
                      : "red",
                }}
              >
                Bạn chọn: {result.choices && result.choices[index]}
              </p>
              <p style={{ color: "green" }}>
                Đáp án đúng: {question.correctOption}
              </p>
            </Card>
          ))}
          <h3>
            Kết quả:{" "}
            <span style={{ color: pass ? "green" : "red" }}>
              {pass ? "Pass" : "Fail"}
            </span>
          </h3>
        </div>
      </Content>
    </Layout>
  );
};

const Page = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading]= useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/students/tests/result/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data.result);
        setLoading(false)
        setResult(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  return <ResultPage result={result} />;
};

export default Page;
