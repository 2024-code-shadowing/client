import React, { useState, useEffect, useRef } from 'react';
import PageRenderer from "./Background"

const contents = {
    title: "title 1",
    page: 1,
    contents: "#define _CRT_SECURE_NO_WARNINGS\n#include <stdio.h>\nint main(){\n\treturn 0;\n}\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd"
}

const maxInputLength = contents.contents.length;

function TypingScreen() {
    const [userInput, setUserInput] = useState('');
    const [accuracy, setAccuracy] = useState(100);
    const [speed, setSpeed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [typedCharacters, setTypedCharacters] = useState(0);
    const [inputCompleted, setInputCompleted] = useState(false); // 입력 완료 여부 추가

    useEffect(() => {
        // 코드와 사용자 입력 비교하여 정확성 계산
        const code = contents.contents.replace(/\s+/g, ''); // 공백 제거
        const userCode = userInput.replace(/\s+/g, ''); // 공백 제거
        const codeLength = code.length;

        let incorrectCharacters = 0;
        for (let i = 0; i < codeLength; i++) {
            if (userCode[i] && userCode[i] !== code[i]) {
                incorrectCharacters++;
            }
        }

        const newAccuracy = ((codeLength - incorrectCharacters) / codeLength) * 100;
        setAccuracy(newAccuracy);

        // 타자 속도 계산
        const elapsedTime = (Date.now() - startTime) / 60000; // 분 단위로 변환
        const typedSpeed = typedCharacters / elapsedTime;
        setSpeed(typedSpeed.toFixed(2)); // 소수점 둘째 자리까지 표시

        // 입력이 완료되면 current_speed 측정을 멈추기
        if (userInput.length === maxInputLength) {
            setInputCompleted(true);
        }
    }, [userInput, typedCharacters, startTime, maxInputLength]);

    const textareaRef = useRef(null);

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= maxInputLength) {
            setUserInput(value);
            setTypedCharacters(value.length);
            if (!startTime) {
                setStartTime(Date.now()); // 타이핑 시작 시간 설정
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // 기본 동작 막기
            const { selectionStart, selectionEnd } = e.target;
            setUserInput(prevInput => prevInput.substring(0, selectionStart) + '\t' + prevInput.substring(selectionEnd));
        }
    };

    const handleClick = () => {
        textareaRef.current.focus();
    };

    const renderText = () => {
        const code = contents.contents;
        const userCode = userInput;
        const codeLength = code.length;

        let renderedText = [];

        for (let i = 0; i < codeLength; i++) {
            if (userCode[i]) {
                if (userCode[i] === code[i]) {
                    renderedText.push(<span style={{ color: 'blue' }} key={i}>{code[i]}</span>);
                } else {
                    renderedText.push(<span style={{ color: 'red' }} key={i}>{userCode[i]}</span>);
                }
            } else {
                renderedText.push(<span style={{ color: 'white' }} key={i}>{code[i]}</span>);
            }
        }

        return renderedText;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime && !inputCompleted) { // 입력이 완료되지 않았을 때만 타자 속도 업데이트
                const elapsedTime = (Date.now() - startTime) / 60000; // 분 단위로 변환
                const typedSpeed = typedCharacters / elapsedTime;
                setSpeed(typedSpeed.toFixed(2)); // 소수점 둘째 자리까지 표시
            }
        }, 100); // 0.1초마다 업데이트

        return () => clearInterval(interval);
    }, [startTime, typedCharacters, inputCompleted]);

    return (
        <div className="flex flex-col w-full h-full border border-black border-solid bg-neutral-400" onClick={handleClick}>
            <div className="flex justify-between items-center w-full h-1/10 p-2 border border-black border-solid bg-neutral-400">
                <div></div> {/* 이 부분은 go_back 버튼을 왼쪽 끝에 고정하기 위한 공간입니다 */}
                <h1 className="text-center flex-gro text-3xl text-basic-blue">{contents.title}</h1>
                <PageRenderer page_type="go_back" />
            </div>
            <div className="w-full h-full p-2 border border-black border-solid bg-neutral-400">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-3/5 h-2/3 p-2 absolute"
                    style={{ resize: 'none', opacity: '0', zIndex: '1' }}
                    placeholder="Start typing here..."
                />
                <div style={{ whiteSpace: 'pre-wrap', zIndex: '0' }}>
                    {renderText()}
                </div>
            </div>
            <div className="flex pagination-wrapper mt-auto text-center text-basic-blue">
                <div className="flex-grow border border-black p-2">
                    prev speed: 100 WPM
                </div>
                <div className="flex-grow border border-black p-2">
                    current speed: {speed} WPM
                </div>
                <div className="flex-grow border border-black p-2">
                    Accuracy: {accuracy.toFixed(2)} %
                </div>
            </div>
        </div>
    );
}

export default TypingScreen;
