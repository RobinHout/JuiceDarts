"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import { rondjeScore } from "./types/types";

type honderdtachtig = {
    positie: number;
    userName: string;
    aantal: number;
};
const honderdtachtigs: honderdtachtig[] = [
    { positie: 1, userName: "Jack", aantal: 3 },
    { positie: 2, userName: "Sjoerd", aantal: 1 },
    { positie: 2, userName: "Siebe", aantal: 1 },
    { positie: 2, userName: "Robin", aantal: 1 },
    { positie: 2, userName: "Koos", aantal: 1 },
];
export default function Home() {
    const [scores, setScores] = useState<rondjeScore[]>([]);

    useEffect(() => {
        fetchScoresNieuw();
    }, []);

    const fetchScoresNieuw = async () => {
        fetch(
            "https://juicedartsbackend-production.up.railway.app/Rondje/alleRondjes"
        )
            .then((res) => res.json())
            .then((data) => setScores(data));
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
                    🏆 180 Counter 🏆
                </h2>

                <div className="grid grid-cols-2 px-3 py-1 text-xs font-semibold text-gray-600 border-b">
                    <span>Naam</span>
                    <span className="text-right">Aantal</span>
                </div>

                {honderdtachtigs.length === 0 ? (
                    <p className="text-center text-gray-400 py-3 text-sm">
                        Nog geen scores...
                    </p>
                ) : (
                    honderdtachtigs.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 px-2 py-1.5 text-sm text-gray-800 border-b hover:bg-gray-50 transition"
                        >
                            <span>{item.userName}</span>
                            <span className="text-right font-medium">
                                {item.aantal}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center ">
                <div className="flex justify-center mt-6 mr-5">
                    <Link
                        href={{ pathname: "/Rondje" }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition duration-200"
                    >
                        Nieuw spel
                    </Link>
                </div>
                <div className="flex justify-center mt-6">
                    <Link
                        href={{ pathname: "/Statistieken" }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition duration-200"
                    >
                        Statistieken
                    </Link>
                </div>
            </div>
            <table className="tabel">
                <thead>
                    <tr>
                        <th className="cellStyle">Wie</th>
                        <th className="cellStyle">Eerste 20</th>
                        <th className="cellStyle">Totaal</th>
                    </tr>
                </thead>
                <tbody>
                    {[...scores]
                        .sort((a, b) => b.gameId - a.gameId) // sorteer op gameId, aflopend
                        .map((score) => (
                            <tr key={score.gameId}>
                                <td className="cellStyle">{score.userName}</td>
                                <td className="cellStyle">
                                    {score.eersteTwintig}
                                </td>
                                <td className="cellStyle">{score.totaal}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
