"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import { Score } from "./types/types";
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
    // const [scores] = useState<Score[]>([]);
    const [week, setWeek] = useState<Score[]>([]);

    useEffect(() => {
        // fetchScoresNieuw();
        fetchWeekscores();
    }, []);
    const fetchWeekscores = async () => {
        const { data: rondjeScore, error } = await supabase
            .from("Rondje")
            .select("*");
        if (error) console.error(error + "Dit is de supabase error");
        else {
            setWeek(rondjeScore);
            console.log("Hallo" + rondjeScore);
        }
    };
    // const fetchScoresNieuw = async () => {
    //     const res = await fetch("api/data", { cache: "no-store" });
    //     console.log(res.json());
    //     setScores(await res.json());
    // };
    // const fetchWeekscores = async () => {
    //     const res = await fetch("api/lastSeven", { cache: "no-store" });
    //     console.log(res.json());
    //     setWeek(await res.json());
    // };

    // const fetchScoresNieuw = async () => {
    //     fetch(
    //         "https://juicedartsbackend-production.up.railway.app/Rondje/alleRondjes"
    //     )
    //         .then((res) => res.json())
    //         .then((data) => setScores(data));
    // };
    // const fetchWeekscores = async () => {
    //     fetch(
    //         "https://juicedartsbackend-production.up.railway.app/Rondje/getRondjesWeek"
    //     )
    //         .then((res) => res.json())
    //         .then((data) => setWeek(data));
    // };

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
            <div className="flex flex-col lg:flex-row justify-center mt-10 gap-4">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        {/* 🏆 Top 10 van de week */}
                        Scores
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
                            {[...week].reverse().map((weekscore) => (
                                <tr key={weekscore.date}>
                                    <td className="cellStyle">
                                        {weekscore.UserName}
                                    </td>
                                    <td className="cellStyle">
                                        {weekscore.EersteTwintig}
                                    </td>
                                    <td className="cellStyle">
                                        {weekscore.Totaal}
                                    </td>
                                    <td className="cellStyle">
                                        {String(weekscore.date).slice(0, 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <div className="w-full lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        Laatste scores
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
                                <tr key={score.Date}>
                                    <td className="cellStyle">{score.User}</td>
                                    <td className="cellStyle">
                                        {score.Twintig}
                                    </td>
                                    <td className="cellStyle">
                                        {score.Totaal}
                                    </td>
                                    <td className="cellStyle">
                                        {formatInTimeZone(
                                            score.Date,
                                            "Europe/Amsterdam",
                                            "dd-MM HH:mm"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    );
}
