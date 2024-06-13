import React from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
    return (
        <section className="flex flex-col justify-center items-center w-4/5 h-4/5  bg-neutral-400">
            <h1 className="flex justify-center items-center w-full h-3/5 text-7xl text-center text-basic-blue uppercase whitespace-nowrap border-8 border-black border-double bg-neutral-400
            font-press-start-2p">
                code <br /> Shadowing
            </h1>
            <div className="flex justify-center items-center space-x-28 w-4/5 h-2/5 mt-8 uppercase">
                <Link to='/title'>
                    <Button type="start" />
                </Link>
                {/* <Button type="rank" /> */}
            </div>
        </section>
    );
}

function Button({ type }) {
    // start 패딩은 p-8
    // rank 패딩은 py-8 px-16
    let padding;

    switch (type) {
        case "start":
            padding = "p-8";
            break;
        case "rank":
            padding = "py-8 px-16";
            break;
    }

    return (
        <button className={`text-6xl ${padding}
                border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400
                hover:border-t-neutral-900 hover:border-l-neutral-800 hover:border-b-neutral-200 hover:border-r-neutral-300 hover:bg-neutral-500 hover:text-hoverd-blue
                active:text-clicked-blue
                font-press-start-2p text-basic-blue uppercase`}>
            {type}
        </button>
    )
}

export default StartScreen;