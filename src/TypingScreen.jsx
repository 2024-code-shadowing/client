import React, { useState, useEffect, useRef } from 'react';
import PageRenderer from "./Background";
import Modal from './Modal';

const contents = {
    title: "title 1",
    page: 1,
    contents: "#define _CRT_SECURE_NO_WARNINGS\n#include <stdio.h>\nint main(){\n\treturn 0;\n}\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd\nd"
};

const maxInputLength = contents.contents.length;

function TypingScreen() {
    const [userInput, setUserInput] = useState('');
    const [accuracy, setAccuracy] = useState(100);
    const [speed, setSpeed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [typedCharacters, setTypedCharacters] = useState(0);
    const [inputCompleted, setInputCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        const code = contents.contents.replace(/\s+/g, '');
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
        setSpeed(typedSpeed.toFixed(2));

        if (userInput.length === maxInputLength) {
            setInputCompleted(true);
        }
    }, [userInput, typedCharacters, startTime, maxInputLength]);

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= maxInputLength) {
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
            if (startTime && !inputCompleted) {
                const elapsedTime = (Date.now() - startTime) / 60000;
                const typedSpeed = typedCharacters / elapsedTime;
                setSpeed(typedSpeed.toFixed(2));
            }
        }, 100);

        return () => clearInterval(interval);
    }, [startTime, typedCharacters, inputCompleted]);

    useEffect(() => {
        if (inputCompleted) {
            setShowModal(true);
        }
    }, [inputCompleted]);

    return (
        <div className="flex flex-col w-full h-full border border-black border-solid bg-neutral-400" onClick={handleClick}>
            <div className="flex justify-between items-center w-full h-1/10 p-2 border border-black border-solid bg-neutral-400">
                <div></div>
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
            {showModal && <Modal speed={speed} accuracy={accuracy} closeModal={() => setShowModal(false)} />}
        </div>
    );
}

export default TypingScreen;

