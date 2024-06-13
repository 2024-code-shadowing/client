import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import PageRenderer from "./Background";
import Modal from './Modal'; // 모달 컴포넌트 import 추가
import { useParams } from 'react-router-dom';

const TypingScreen = () => {
    const { id } = useParams();
    const [contents, setContents] = useState({ title: "", pages: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [accuracy, setAccuracy] = useState(100);
    const [speed, setSpeed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [typedCharacters, setTypedCharacters] = useState(0);
    const [inputCompleted, setInputCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [prevSpeed, setPrevSpeed] = useState(0); // 이전 속도를 저장하는 상태 추가

    const textareaRef = useRef(null);

    useEffect(() => {
        axios.get(`/api/codes/contents/${id}`)
            .then(response => {
                const { title, data } = response.data;
                setContents({ title, pages: data });
            })
            .catch(error => {
                console.error('Error fetching code contents:', error);
            });
    }, [id]);

    const getCurrentPageContent = useCallback(() => {
        const page = contents.pages.find(p => p.page === currentPage);
        return page ? page.content.map(line => line.content).join('\n') : '';
    }, [contents.pages, currentPage]);

    useEffect(() => {
        const code = getCurrentPageContent().replace(/\s+/g, '');
        const userCode = userInput.replace(/\s+/g, '');
        const codeLength = code.length;

        let incorrectCharacters = 0;
        for (let i = 0; i < codeLength; i++) {
            if (userCode[i] && userCode[i] !== code[i]) {
                incorrectCharacters++;
            }
        }

        const newAccuracy = ((codeLength - incorrectCharacters) / codeLength) * 100;
        setAccuracy(newAccuracy);

        const elapsedTime = (Date.now() - startTime) / 60000;
        const typedSpeed = typedCharacters / elapsedTime;
        setSpeed(Math.round(typedSpeed));

        if (userInput.length !== 0 && userInput.length === getCurrentPageContent().length) {
            setInputCompleted(true);
        }
    }, [userInput, typedCharacters, startTime, getCurrentPageContent]);

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= getCurrentPageContent().length) {
            setUserInput(value);
            setTypedCharacters(value.length);
            if (!startTime) {
                setStartTime(Date.now());
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            setUserInput(prevInput => prevInput.substring(0, selectionStart) + '\t' + prevInput.substring(selectionEnd));
        }
    };

    const handleClick = () => {
        textareaRef.current.focus();
    };

    const renderText = () => {
        const code = getCurrentPageContent();
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
            if (startTime && !inputCompleted) {
                const elapsedTime = (Date.now() - startTime) / 60000;
                const typedSpeed = typedCharacters / elapsedTime;
                setSpeed(Math.round(typedSpeed));
            }
        }, 100);

        return () => clearInterval(interval);
    }, [startTime, typedCharacters, inputCompleted]);

    useEffect(() => {
        if (inputCompleted) {
            setShowModal(true);
        }
    }, [inputCompleted]);

    const handleNextPage = () => {
        setShowModal(false);
        setPrevSpeed(speed); // 현재 속도를 이전 속도로 설정
        setCurrentPage(prevPage => prevPage + 1);
        setUserInput('');
        setInputCompleted(false);
        setStartTime(null); // 새 페이지에서 시간을 다시 측정하기 위해 초기화
    };

    const handleFinish = () => {
        // 마지막 페이지 입력 완료 시 필요한 동작 구현 (예: 홈으로 이동)
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col w-full h-full border border-black border-solid bg-neutral-400" onClick={handleClick}>
            <div className="flex justify-between items-center w-full h-1/10 p-2 border border-black border-solid bg-neutral-400">
                <div></div>
                <h1 className="text-center flex-grow text-3xl text-basic-blue">{contents.title}</h1>
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
                    prev speed: {currentPage === 1 ? 0 : prevSpeed} WPM
                </div>
                <div className="flex-grow border border-black p-2">
                    current speed: {speed} WPM
                </div>
                <div className="flex-grow border border-black p-2">
                    Accuracy: {accuracy.toFixed(2)} %
                </div>
            </div>
            {showModal &&
                <Modal
                    speed={speed}
                    accuracy={accuracy}
                    onNext={currentPage < contents.pages.length ? handleNextPage : null}
                    onFinish={currentPage === contents.pages.length ? handleFinish : null}
                />}
        </div>
    );
}

export default TypingScreen;
