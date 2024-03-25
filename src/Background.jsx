import React from 'react';
import StartScreen from './StartScreen';
import TitleScreen from './TitleScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function FullPageBackground({ page_type }){
    let width;

    switch(page_type){
        case "start":
        case "title":
        case "typing":
            width = "w-3/5"
            break;
        case "rank":
            width = "w-1/3"
    }

    console.log(width);

    return (
        <main className="flex justify-center drag-none items-center min-h-screen bg-basic-blue font-press-start-2p">
            {/* 큰창 출력 */} 
            <section className={`flex justify-center items-center ${width} h-[735px] border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400`}>
            {page_type === "start" && <StartScreen />}
            {page_type === "title" && <TitleScreen />}
            {/* {page_type === "typing"} */}
            </section>
        </main>
    );
}

export default FullPageBackground;