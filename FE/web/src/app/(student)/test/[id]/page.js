"use client";
import React, { useState, useEffect } from "react";
import { Layout, Card, Radio, Typography, Button, Spin } from "antd";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { message } from "antd";

const { Header, Footer, Content } = Layout;
const { Text } = Typography;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#AA0000",
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#FFFFFF",
  backgroundColor: "#AA0000",
  padding: 24,
  overflowY: "auto",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#AA0000",
  height: 70,
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100vh",
};

const Timer = ({ test, onSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(test.duration);

  useEffect(() => {
    setTimeLeft(test.duration);
  }, [test.duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => Math.max(0, timeLeft - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onSubmit();
    }
  }, [timeLeft, onSubmit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return (
    <Text strong style={{ color: "#fff" }}>
      Time left: {formattedTime}
    </Text>
  );
};

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [choices, setChoices] = useState("");
  
  useEffect(() => {
    console.log("Choices:", choices);
  }, [choices]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/students/tests/questions/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setTest(data.result);
        const newChoices = Array.from(
          { length: data.result.questions.length },
          () => ""
        );
        setChoices(newChoices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleFinish = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/students/tests/submit/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ choices: choices }),
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        message.success("Nộp bài thi thành công!");
        router.replace(`/result/${id}`);
      } else {
        message.error("Nộp bài thi thất bại!");
      }
    } catch (error) {
      message.error("Nộp bài thi thất bại!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFinish();
  };

  if (!test) {
    return <Spin />;
  }

  const changeIndexChoice = async (e, index) => {
    // Tạo một bản sao của mảng choice
    const updatedChoices = [...choices];
    // Thay đổi phần tử thứ ba thành giá trị mới
    updatedChoices[index] = e.target.value;
    // Cập nhật mảng choice với giá trị mới
    setChoices(updatedChoices);
  };

  const QuestionCard = ({ question, options, questionIndex }) => (
    <Card
      title={question}
      style={{ width: "100%", marginBottom: 16, textAlign: "left" }}
    >
      <Radio.Group
        onChange={(e) => changeIndexChoice(e, questionIndex)}
        value={choices[questionIndex]}
        style={{ textAlign: "left" }}
      >
        {options.map((option, index) => (
          <Radio
            key={index}
            value={String.fromCharCode(65 + index)}
            style={{ display: "block", textAlign: "left" }}
          >
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );

  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Header style={headerStyle}>{test.name}</Header>
        <Content style={contentStyle}>
          {test.questions.map((question, index) => (
            <QuestionCard
              key={index}
              questionIndex={index}
              question={question.questionText}
              options={question.options}
            />
          ))}
        </Content>
        <Footer style={footerStyle}>
          <Timer test={test} onSubmit={handleFinish} />
          <Button
            type="primary"
            style={{
              marginLeft: "20px",
              backgroundColor: "#009900",
              borderColor: "#009900",
            }}
            onClick={handleSubmit}
            disabled={test.duration <= 0} // Disable nút Submit nếu hết thời gian
          >
            Submit
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Page;