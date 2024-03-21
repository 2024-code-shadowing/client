import React from 'react';
import StartScreen from './StartScreen';

function FullPageBackground({ page_type }){
    let width;

    switch(page_type){
        case "start":
        case "chose":
        case "typing":
            width = "w-3/5"
            break;
        case "rank":
            width = "w-1/3"
    }

    console.log(width);

    return (
        <main className="flex justify-center items-center min-h-screen bg-basic-blue">
            {/* 큰창 출력 */} 
            <section className={`flex justify-center items-center ${width} h-[735px] border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400`}>
                {/* 시작 화면 */}
                <StartScreen />
                {/* 코드 선택 화면 */}
                {/* 타이핑 화면 */}
                {/* 랭크 화면 */}
            </section>
        </main>
    );
}

export default FullPageBackground;