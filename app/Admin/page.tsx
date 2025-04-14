"use client";
import { useState } from "react";

export default function Rondje() {
    const [naam, setNaam] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNaam(e.target.value);
    };
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

    return (
        <div className="p-4">
            <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Naam
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
    );
}
