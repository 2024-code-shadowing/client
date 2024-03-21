import React from "react";
import PropTypes from "prop-types";

function CodeShadowingPage() {
  return (
    <main className="flex justify-center items-center px-16 py-20 bg-blue-800 max-md:px-5">
      <section className="flex flex-col justify-center p-2.5 mt-24 w-full border border-black border-solid bg-neutral-400 max-w-[1370px] max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-20 border border-black border-solid bg-neutral-400 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col mt-3 max-w-full w-[1139px]">
            <h1 className="justify-center items-center px-16 py-20 text-8xl text-center text-blue-800 uppercase whitespace-nowrap border-2 border-black border-solid bg-neutral-400 max-md:px-5 max-md:max-w-full max-md:text-4xl">
              code <br /> Shadowing
            </h1>
            <div className="self-center mt-20 max-w-full w-[985px] max-md:mt-10">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <CodeShadowingButton text="START" />
                <CodeShadowingButton text="RANK" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CodeShadowingButton({ text }) {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center p-1.5 w-full text-6xl text-center text-blue-800 uppercase whitespace-nowrap border border-black border-solid bg-neutral-400 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        <div className="justify-center px-14 py-10 border border-black border-solid bg-neutral-400 max-md:pr-7 max-md:pl-5 max-md:max-w-full max-md:text-4xl">
          {text}
        </div>
      </div>
    </div>
  );
}

CodeShadowingButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CodeShadowingPage;
