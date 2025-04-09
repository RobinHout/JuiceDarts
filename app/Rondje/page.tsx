"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
type Props = {
    naam: string;
};
export default function Rondje({ naam }: Props) {
    const [gegooid, setGegooid] = useState(0);
    const [twint, setTwint] = useState(0);
    const [beurt, setBeurt] = useState(1);
    const [klaar, setKlaar] = useState(false);
    const [bull, setBull] = useState(false);

    function Gemist() {
        setGegooid(gegooid + 1);
    }

    function Geraakt(x: number) {
        setGegooid(gegooid + 1);
        if (bull) {
            setKlaar(true);
        }
        const nieuweBeurt = beurt + x;
        if (nieuweBeurt >= 21 && !bull) {
            setBeurt(21);
            setBull(true);
            setTwint(nieuweBeurt);
        } else {
            setBeurt(beurt + x);
        }
    }

    async function voerScoresIn() {
        const { error } = await supabase
            .from("rondjeScore")
            .insert([{ userName: naam, eersteTwintig: twint, totaal: beurt }])
            .select();
        if (error) {
            console.error("Fout bij uploaden:", error.message);
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dart Rondje van {naam}
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
            {klaar && (
                <div className="flex flex-col items-center gap-4 mt-6">
                    <div className="text-lg font-semibold text-green-700">
                        🎯 Je bent klaar!
                    </div>
                    <Link
                        href="/"
                        onClick={voerScoresIn}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow transition"
                    >
                        Terug naar home
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={Gemist}
                    disabled={klaar}
                >
                    Gemist
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(1)}
                    disabled={klaar}
                >
                    {beurt} geraakt
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(2)}
                    disabled={klaar}
                >
                    Dubbel {beurt} geraakt
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow"
                    onClick={() => Geraakt(3)}
                    disabled={klaar}
                >
                    Triple {beurt} geraakt
                </button>
            </div>
        </div>
    );
}
