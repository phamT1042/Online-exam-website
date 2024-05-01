"use client";
import { useState, useRef, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import { message } from "antd";
import Link from "next/link";

const page = () => {
  const [test, setTest] = useState({
    exam: "",
    name: "",
    type: 1,
    startDay: "",
    endDay: "",
    duration: 60,
    questions: [
      { questionText: "", options: ["", "", "", ""], correctOption: "" },
    ],
  });

  const questionContainerRef = useRef(null);

  useEffect(() => {
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollTop =
        questionContainerRef.current.scrollHeight;
    }
  }, [test.questions]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...test.questions];
    list[index][name] = value;
    setTest((prevState) => ({ ...prevState, questions: list }));
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const list = [...test.questions];
    list[questionIndex].options[optionIndex] = value;
    setTest((prevState) => ({ ...prevState, questions: list }));
  };

  const handleCorrectOptionChange = (e, questionIndex) => {
    const { value } = e.target;
    const list = [...test.questions];
    list[questionIndex].correctOption = value;
    setTest((prevState) => ({ ...prevState, questions: list }));
  };

  const handleTestChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = () => {
    setTest((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { questionText: "", options: ["", "", "", ""], correctOption: "" },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const list = [...test.questions];
    list.splice(index, 1);
    setTest((prevState) => ({ ...prevState, questions: list }));
  };

  const [selectedOption, setSelectedOption] = useState(test.type); // State để lưu trữ giá trị được chọn

  const handleChange = (event) => {
    const now = event.target.value;
    setSelectedOption(now); // Cập nhật giá trị khi người dùng chọn một tùy chọn mới
    setDisabled(now == 0);
    setTest((prevState) => ({ ...prevState, type: now }));
  };

  //   useEffect(() => {
  //     console.log(isDisabled);
  //   }, [isDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!test.name.trim()) {
      message.error("Tên bài thi không được để trống!");
      return; // Ngăn không cho tiếp tục thực hiện hàm nếu tên bài thi trống
    }
    try {
      const response = await fetch("http://localhost:8080/api/admin/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(test),
      });
      if (response.ok) {
        message.success("Tạo bài thi thành công!");
        // Thực hiện các hành động khác sau khi test đã được tạo
      } else {
        message.error("Tạo bài thi thất bại!");
      }
    } catch (error) {
      message.error("Tạo bài thi thất bại!");
    }
  };

  const [isDisabled, setDisabled] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-20 max-w-screen-2xl mx-auto"
    >
      <div>
        <label className="block mb-2 text-lg font-bold">Tên kì thi:</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={test.exam}
          onChange={(e) => setTest({ ...test, name: e.target.value })}
        />
        <label className="block mt-4 mb-2 text-lg font-bold">
          Tên bài thi:
        </label>
        <input
          className="w-full  px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={test.name}
          onChange={(e) => setTest({ ...test, name: e.target.value })}
        />

        <div>
          <label className="block mt-4 mb-2 text-lg font-bold">Thể loại:</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            id="combo"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="1">Có thời hạn</option>
            <option value="0">Tự do</option>
          </select>
        </div>

        <div>
          <label className="block mt-4 mb-2 text-lg font-bold">
            Ngày bắt đầu:
          </label>
          <input
            className={
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            }
            type="datetime-local"
            value={test.startDay}
            disabled={isDisabled}
            onChange={(e) => setTest({ ...test, startDay: e.target.value })}
          />
        </div>
        <div>
          <label className="block mt-4 mb-2 text-lg font-bold">
            Ngày kết thúc:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="datetime-local"
            value={test.endDay}
            disabled={isDisabled}
            onChange={(e) => setTest({ ...test, endDay: e.target.value })}
          />
        </div>

        <label className="block mt-4 mb-2 text-lg font-bold">
          Thời gian thi:
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={test.duration}
          onChange={(e) => setTest({ ...test, duration: e.target.value })}
        />

        {/* Add other test fields here */}
      </div>
      <div ref={questionContainerRef} className="overflow-y-auto max-h-[680px]">
        {test.questions.map((x, i) => (
          <div key={i} className="mb-3">
            <label
              className="block text-lg font-bold"
              htmlFor={`questionText-${i}`}
            >
              Question:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id={`questionText-${i}`}
              name="questionText"
              value={x.questionText}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div className="mt-4">
              {x.options.map((option, j) => (
                <div className="flex items-center mb-2" key={j}>
                  <label className="block text-lg font-bold">
                    {String.fromCharCode(65 + j)}.
                  </label>
                  <input
                    className="grow ml-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(e, i, j)}
                  />
                </div>
              ))}
              <div className="flex items-center mb-2">
                <label className="block text-lg font-bold">Đáp án đúng:</label>
                <input
                  className="grow ml-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  value={x.correctOption}
                  onChange={(e) => handleCorrectOptionChange(e, i)}
                />
              </div>
            </div>
            {/* Render options and correct option inputs here */}
            <div className="flex">
              <button
                type="button"
                onClick={() => handleRemoveQuestion(i)}
                className="mx-auto mt-4 px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className={`w-full mx-auto px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600 ${
            test.questions.length === 0 ? "mt-9" : "mt-3"
          }`}
        >
          Thêm câu hỏi
        </button>
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="w-32 px-4 mx-6 py-2 text-lg font-bold text-white bg-green-500 rounded-md focus:outline-none hover:bg-green-600"
        >
          Tạo bài thi
        </button>
        <Link href={"/admin/dashboard"}>
          <button
            type="button"
            className="w-32 px-4 mx-6 py-2 text-lg font-bold text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
          >
            Hủy
          </button>
        </Link>
      </div>
    </form>
  );
};

export default page;
