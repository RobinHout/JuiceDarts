"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import { Score, Leg } from "./types/types";
import { supabase } from "./lib/supabaseClient";

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
    const now = new Date();
    const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // last 7 days

    const [scores, setScores] = useState<Score[]>([]);
    const [week, setWeek] = useState<Score[]>([]);
    const [legScores, setLegScores] = useState<Leg[]>([]);

    useEffect(() => {
        fetchWeekscores();
        fetchLegScores();
        fetchScoresNieuw();
    }, []);

    const fetchWeekscores = async () => {
        const { data, error } = await supabase
            .from("Rondje")
            .select("*")
            .order("date", { ascending: false })
            .limit(10);
        if (error)
            console.error(
                error + "Dit is de supabase error voor FetchWeekscores"
            );
        else {
            setWeek(data);
        }
    };

    const fetchLegScores = async () => {
        const { data, error } = await supabase.from("Leg").select("*");
        if (error)
            console.error(
                error + "Dit is de supabase error voor FetchLegScores"
            );
        else {
            setLegScores(data);
        }
    };

    const fetchScoresNieuw = async () => {
        const { data, error } = await supabase
            .from("Rondje")
            .select("*")
            .gte("date", from.toISOString())
            .lte("date", now.toISOString())
            .order("Totaal", { ascending: true })
            .limit(10);
        if (error)
            console.error(
                error + "Dit is de supabase error voor FetchScoresNieuw"
            );
        else {
            setScores(data);
        }
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
                        Nieuw Rondje
                    </Link>
                </div>
                <div className="flex justify-center mt-6">
                    <Link
                        href={{ pathname: "/Leg" }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition duration-200"
                    >
                        Nieuwe Leg
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center mt-10 gap-4">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Alle Gegooide Legs
                    </h2>

                    <table className="tabel w-full">
                        <thead>
                            <tr>
                                <th className="cellStyle">Wie</th>
                                <th className="cellStyle">Tot Honderd</th>
                                <th className="cellStyle">Totaal</th>
                                <th className="cellStyle">Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {legScores.map((leg) => (
                                <tr key={leg.date}>
                                    <td className="cellStyle">{leg.User}</td>
                                    <td className="cellStyle">
                                        {leg.TotHonderd}
                                    </td>
                                    <td className="cellStyle">{leg.Totaal}</td>
                                    <td className="cellStyle">
                                        {String(leg.date).slice(5, 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Alle Gegooide Rondjes
                    </h2>

                    <table className="tabel w-full">
                        <thead>
                            <tr>
                                <th className="cellStyle">Wie</th>
                                <th className="cellStyle">Eerste 20</th>
                                <th className="cellStyle">Totaal</th>
                                <th className="cellStyle">Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {week.map((laatsteScore) => (
                                <tr key={laatsteScore.date}>
                                    <td className="cellStyle">
                                        {laatsteScore.UserName}
                                    </td>
                                    <td className="cellStyle">
                                        {laatsteScore.EersteTwintig}
                                    </td>
                                    <td className="cellStyle">
                                        {laatsteScore.Totaal}
                                    </td>
                                    <td className="cellStyle">
                                        {String(laatsteScore.date).slice(5, 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        🏆 Top 10 Rondjes van de Afgelopen 7 Dagen
                    </h2>

                    <table className="tabel w-full">
                        <thead>
                            <tr>
                                <th className="cellStyle">Wie</th>
                                <th className="cellStyle">Eerste 20</th>
                                <th className="cellStyle">Totaal</th>
                                <th className="cellStyle">Datum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score) => (
                                <tr key={score.date}>
                                    <td className="cellStyle">
                                        {score.UserName}
                                    </td>
                                    <td className="cellStyle">
                                        {score.EersteTwintig}
                                    </td>
                                    <td className="cellStyle">
                                        {score.Totaal}
                                    </td>
                                    <td className="cellStyle">
                                        {String(score.date).slice(5, 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
