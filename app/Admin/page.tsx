"use client";
import { useEffect, useState } from "react";
import { rondjeScore } from "../types/types";

export default function Rondje() {
    const [naam, setNaam] = useState("");
    const [id, setId] = useState(0);
    const [message, setMessage] = useState("");
    const [scores, setScores] = useState<rondjeScore[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNaam(e.target.value);
    };
    const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(Number(e.target.value));
    };
    useEffect(() => {
        fetchScoresNieuw();
    }, []);

    async function submit() {
        const response = await fetch(
            `https://juicedartsbackend-production.up.railway.app/User/nieuwUser?name=${naam}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            setMessage(naam + " is de naam die je hebt ingevoerd.");
        } else {
            console.error("Fout bij opslaan van de naam:", response.statusText);
        }
    }
    async function submitID() {
        const response = await fetch(
            `https://juicedartsbackend-production.up.railway.app/User/nieuwUser?name=${naam}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            setMessage(naam + " is de naam die je hebt ingevoerd.");
        } else {
            console.error("Fout bij opslaan van de naam:", response.statusText);
        }
    }
    const fetchScoresNieuw = async () => {
        fetch(
            "https://juicedartsbackend-production.up.railway.app/Rondje/alleRondjes"
        )
            .then((res) => res.json())
            .then((data) => {
                setScores(data);
                console.log(data);
            });
    };

    return (
        <div className="flex justify-around">
            <div className="p-4 background-gray-100 rounded-md shadow-md ml-5 mt-10 w-100">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Voeg een nieuwe gebruiker toe
                </label>
                <input
                    id="name"
                    type="text"
                    value={naam}
                    onChange={handleChange}
                    placeholder="Typ hier je naam"
                    className="border border-gray-300 rounded-md p-2 w-20"
                />
                <p className="mt-2 text-sm text-gray-600">
                    Ingevoerde waarde: {naam}
                </p>
                <button
                    onClick={submit}
                    className="mt-2 border-gray-400 rounded-md p-2 w-24 bg-blue-500 text-white hover:bg-blue-600"
                >
                    Submit
                </button>
                <p>{message}</p>
            </div>
            <div className="p-4 background-gray-100 rounded-md shadow-md max-w-sm ml-5 mt-10 w-100">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Welke score wil je verwijderen?
                </label>
                <input
                    id="name"
                    type="integer"
                    value={id}
                    onChange={handleIDChange}
                    placeholder=" "
                    className="border border-gray-300 rounded-md p-2 w-20"
                />
                <p className="mt-2 text-sm text-gray-600">
                    Ingevoerde waarde: {id}
                </p>
                <button
                    onClick={submitID}
                    className="mt-2 border-gray-400 rounded-md p-2 w-24 bg-blue-500 text-white hover:bg-blue-600"
                >
                    Submit
                </button>
                <p>{message}</p>
            </div>
            <div className="">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th className="cellStyle">Id</th>
                            <th className="cellStyle">Wie</th>
                            <th className="cellStyle">Eerste 20</th>
                            <th className="cellStyle">Totaal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score) => (
                            <tr key={score.gameId}>
                                <td className="cellStyle">{score.gameId}</td>
                                <td className="cellStyle">{score.userName}</td>
                                <td className="cellStyle">
                                    {score.eersteTwintig}
                                </td>
                                <td className="cellStyle">{score.totaal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
