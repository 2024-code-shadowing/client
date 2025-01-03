import React from "react";

function SpeedAccuracyDisplay({ speed, accuracy }) {
    return (
        <div className="speed-accuracy-display">
            speed: {speed}cpm
            <br />
            <br />
            accuracy: {accuracy.toFixed(2)}%
        </div>
    );
}

const Modal = ({ speed, accuracy, onNext, onFinish }) => {
    return (
        <div className="modal pt-5 border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400">
            <div className="flex flex-col w-full h-full">
                <SpeedAccuracyDisplay speed={speed} accuracy={accuracy} />
                <div className="flex flex-grow w-full text-2xl">
                    {onNext && (
                        <button
                            className="w-full p-2 border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400
                            hover:border-t-neutral-900 hover:border-l-neutral-800 hover:border-b-neutral-200 hover:border-r-neutral-300 hover:bg-neutral-500
                            active:text-white"
                            onClick={onNext}
                        >
                            Next
                        </button>
                    )}
                    {onFinish &&
                        <button
                            className="w-full p-2 border-8 border-t-neutral-200 border-l-neutral-300 border-b-neutral-900 border-r-neutral-800 bg-neutral-400
                                hover:border-t-neutral-900 hover:border-l-neutral-800 hover:border-b-neutral-200 hover:border-r-neutral-300 hover:bg-neutral-500 
                                active:text-white"
                            onClick={onFinish}
                        >
                            Finish
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;
