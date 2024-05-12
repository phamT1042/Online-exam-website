"use client";
import React, { useState, useEffect } from "react";
import { Layout, Typography, Spin } from "antd";
import { useParams } from "next/navigation";

import ResultPage from '@/components/ResultPage';

const { Header, Content } = Layout;
const { Text } = Typography;

const Page = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

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
        // console.log(data.result);
        setLoading(false)
        setResult(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spin className='flex justify-center items-center' />;
  }

  return <ResultPage result={result} />;
};

export default Page;
