"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "../types/types";

export default function Rondje() {
    const [gegooid, setGegooid] = useState(0);
    const [beurt, setBeurt] = useState(1);
    const [klaar, setKlaar] = useState(false);
    const [opties, setOpties] = useState<User[]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [counter, setCounter] = useState(0);
    const [bull, setBull] = useState(false);
    const [max, setMax] = useState(false);
    const [naam, setNaam] = useState("Robin");
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        fetch(
            "https://juicedartsbackend-production.up.railway.app/User/alleUsers"
        )
            .then((res) => res.json())
            .then((data) => setOpties(data));
    };
    function Gemist() {
        setGegooid(gegooid + 1);
    }

    async function Geraakt(x: number) {
        const nieuwGegooid = gegooid + 1;
        setGegooid(nieuwGegooid);

        if (bull) {
            const x = nieuwGegooid - counter;
            setScores((y) => [...y, x]);
            setCounter(nieuwGegooid);
            setKlaar(true);
        } else {
            const nieuweBeurt = beurt + x;
            if (nieuweBeurt >= 20 && !max) {
                const x = nieuwGegooid - counter;
                setScores((y) => [...y, x]);
                setCounter(nieuwGegooid);
                setBeurt(20);
                setMax(true);
            } else {
                if (nieuweBeurt >= 21 && !bull) {
                    const x = nieuwGegooid - counter;
                    setScores((y) => [...y, x]);
                    setCounter(nieuwGegooid);
                    setBeurt(21);
                    setBull(true);
                } else {
                    const z = nieuwGegooid - counter;
                    setScores((y) => [...y, z]);
                    setCounter(nieuwGegooid);
                    if (x >= 2 && beurt + 1 < 20) {
                        setScores((y) => [...y, 0]);
                        setCounter(nieuwGegooid);
                    }
                    if (x === 3) {
                        setScores((y) => [...y, 0]);
                    }
                    setBeurt(beurt + x);
                }
            }
        }
    }

    const voerScoresInNieuw = async () => {
        const response = await fetch(
            `https://juicedartsbackend-production.up.railway.app/Rondje/nieuwRondje?name=${naam}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(scores),
            }
        );
        if (response.ok) {
            console.log("Scores succesvol opgeslagen!");
            router.push("/");
        } else {
            console.error("Fout bij opslaan van scores:", response.statusText);
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dart Rondje
            </h1>

            <div className="flex gap-10 mb-6 text-center">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="text-sm text-gray-500 mb-2">
                        Gegooide pijlen:
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
                    <select
                        name="naam"
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                        className="dropdown"
                    >
                        {opties.map((optie) => (
                            <option key={optie.userName} value={optie.userName}>
                                {optie.userName}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={voerScoresInNieuw}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow transition"
                    >
                        Terug naar home
                    </button>
                </div>
            )}
            {bull ? (
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
                        Bull geraakt
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    );
}
