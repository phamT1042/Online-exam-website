"use client";

import React, { useState } from "react";
import { Layout, Card, Typography, Radio } from "antd";

const { Header, Content } = Layout;
// const { Text } = Typography;

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
                    paddingBottom: "25px"
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
                                value={result.choices && result.choices[index]}
                                disabled
                            >
                                {question.options.map((option, optionIndex) => {
                                    const ans = ["A", "B", "C", "D"];
                                    return (
                                        <Radio
                                            key={optionIndex}
                                            value={ans[optionIndex]}
                                            style={{
                                                display: "block",
                                                marginBottom: "5px",
                                                color: "black",
                                                backgroundColor: "transparent",
                                            }}
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

export default ResultPage