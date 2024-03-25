import React from 'react';
import StartScreen from './StartScreen';
import TitleScreen from './TitleScreen';
import TypingScreen from './TypingScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function FullPageBackground({ page_type }) {
    let width;

    switch (page_type) {
        case "start":
        case "title":
        case "typing":
            width = "w-3/5"
            break;
        case "rank":
            width = "w-1/3"
            break;
    }

    console.log(width);

    return (
        <main className="flex justify-center drag-none items-center min-h-screen bg-basic-blue font-press-start-2p">
            {/* 큰창 출력 */}
            <section className={`flex justify-center items-center ${width} h-[735px] border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400`}>
                {page_type === "start" && <StartScreen />}
                {page_type === "title" && <TitleScreen />}
                {page_type === "typing" && <TypingScreen />}
            </section>
        </main>
    );
}

function GoBack() {
    return (
        <button
            className="text-2xl justify-center items-center uppercase pt-1 pe-1 ps-1.5 text-center
            border-4 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400
            hover:border-t-red-950 hover:border-l-red-900 hover:border-b-red-300 hover:border-r-red-400 hover:bg-btn-bg-red hover:text-black
            active:border-t-red-950 active:border-l-red-900 active:border-b-red-300 active:border-r-red-400 active:text-white"
            onClick={() => window.history.back()}>
            x
        </button>
    );
}

export default function PageRenderer({ page_type }) {
    if (page_type === "go_back") {
        return <GoBack />;
    } else {
        return <FullPageBackground page_type={page_type} />;
    }
}