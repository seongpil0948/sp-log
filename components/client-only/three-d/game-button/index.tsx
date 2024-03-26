"use client";
export function GameButton(props: { text: string }) {
  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          alert("Hello, world!");
        }}
      >
        {props.text}
      </button>
    </div>
  );
}
