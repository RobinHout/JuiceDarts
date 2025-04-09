"use client";
import { useState } from "react";

export default function Rondje() {
    const [gegooid, setGegooid] = useState(0);
    const [beurt, setBeurt] = useState(1);

    function Gemist() {
        setGegooid(gegooid + 1);
    }

    function Geraakt(x: number) {
        setGegooid(gegooid + 1);
        setBeurt(beurt + x);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dart Rondje
            </h1>

            <div className="flex gap-10 mb-6 text-center">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="text-sm text-gray-500 mb-2">
                        Totaal gegooid
                    </div>
                    <div className="text-2xl font-semibold text-blue-600">
                        {gegooid}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="text-sm text-gray-500 mb-2">Beurt</div>
                    <div className="text-2xl font-semibold text-green-600">
                        {beurt}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={Gemist}
                >
                    Gemist
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(1)}
                >
                    {beurt} geraakt
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(2)}
                >
                    Dubbel {beurt} geraakt
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(3)}
                >
                    Triple {beurt} geraakt
                </button>
            </div>
        </div>
    );
}
