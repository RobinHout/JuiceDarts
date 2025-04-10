"use client";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
// type Props = {
//     naam: string;
// };
type Gebruiker = {
    id: number;
    name: string;
};
export default function Rondje() {
    const [gegooid, setGegooid] = useState(0);
    // const [twint, setTwint] = useState(0);
    const [beurt, setBeurt] = useState(1);
    const [klaar, setKlaar] = useState(false);
    const [opties, setOpties] = useState<Gebruiker[]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [counter, setCounter] = useState(0);
    const [bull, setBull] = useState(false);
    const [max, setMax] = useState(false);
    const [naam, setNaam] = useState("Robin");
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: User, error } = await supabase
                .from("User")
                .select("*");
            if (error) console.error(error);
            else {
                setOpties(User);
            }
        };
        fetchUsers();
    }, []);
    function Gemist() {
        setGegooid(gegooid + 1);
        setCounter(counter + 1);
        console.log(counter);
    }

    async function Geraakt(x: number) {
        const nieuwGegooid = gegooid + 1;
        setGegooid(nieuwGegooid);
        console.log(nieuwGegooid);

        if (bull) {
            setScores((y) => [...y, nieuwGegooid]);
            setKlaar(true);
        } else {
            const nieuweBeurt = beurt + x;
            if (nieuweBeurt >= 20 && !max) {
                setScores((y) => [...y, nieuwGegooid]);
                setBeurt(20);
                setMax(true);
            } else {
                if (nieuweBeurt >= 21 && !bull) {
                    setScores((y) => [...y, nieuwGegooid]);
                    setBeurt(21);
                    setBull(true);
                } else {
                    for (let i = 0; i < x; i++) {
                        if (beurt + i < 20) {
                            setScores((y) => [...y, nieuwGegooid]);
                        }
                    }
                    setBeurt(beurt + x);
                }
            }
        }
    }

    async function voerScoresIn() {
        const { error } = await supabase
            .from("rondjeUitgebreid")
            .insert([
                {
                    userName: naam,
                    totaal: gegooid,
                    eersteTwintig: gegooid - (scores[20] - scores[19]),
                    1: scores[0],
                    2: scores[1] - scores[0],
                    3: scores[2] - scores[1],
                    4: scores[3] - scores[2],
                    5: scores[4] - scores[3],
                    6: scores[5] - scores[4],
                    7: scores[6] - scores[5],
                    8: scores[7] - scores[6],
                    9: scores[8] - scores[7],
                    10: scores[9] - scores[8],
                    11: scores[10] - scores[9],
                    12: scores[11] - scores[10],
                    13: scores[12] - scores[11],
                    14: scores[13] - scores[12],
                    15: scores[14] - scores[13],
                    16: scores[15] - scores[14],
                    17: scores[16] - scores[15],
                    18: scores[17] - scores[16],
                    19: scores[18] - scores[17],
                    20: scores[19] - scores[18],
                    bull: scores[20] - scores[19],
                },
            ])
            .select();
        if (error) {
            console.error("Fout bij uploaden:", error.message);
        } else {
            router.push("/");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dart Rondje
            </h1>

            <div className="flex gap-10 mb-6 text-center">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="text-sm text-gray-500 mb-2">Worp:</div>
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
                    <select
                        name="naam"
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                        className="dropdown"
                    >
                        {/* <option value="">Naam</option> */}
                        {opties.map((optie) => (
                            <option key={optie.name} value={optie.name}>
                                {optie.name}
                            </option>
                        ))}
                    </select>
                    <button
                        // href="/"
                        onClick={voerScoresIn}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow transition"
                    >
                        Terug naar home
                    </button>
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
