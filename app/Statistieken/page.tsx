"use client";
import { useState, useEffect } from "react";
import { User } from "../types/types";
import "../globals.css";

export default function Statistieken() {
    const [naam, setNaam] = useState("Robin");
    const [opties, setOpties] = useState<User[]>([]);
    const [gemiddelde, setGemiddelde] = useState<number[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchGemiddelde(naam);
    }, []);
    const fetchUsers = async () => {
        fetch(
            "https://juicedartsbackend-production.up.railway.app/User/alleUsers"
        )
            .then((res) => res.json())
            .then((data) => setOpties(data));
    };
    const fetchGemiddelde = async (naam: string) => {
        fetch(
            `https://juicedartsbackend-production.up.railway.app/Rondje/getGemiddelde?name=${naam}`
        )
            .then((res) => res.json())
            .then((data) => {
                setGemiddelde(data);
                console.log(data);
            });
    };

    return (
        <>
            {" "}
            <div className="flex justify-center mt-5">
                <select
                    name="naam"
                    value={naam}
                    onChange={(e) => {
                        setNaam(e.target.value);
                        fetchGemiddelde(e.target.value);
                    }}
                    className="dropdown"
                >
                    {opties.map((optie) => (
                        <option key={optie.id} value={optie.userName}>
                            {optie.userName}
                        </option>
                    ))}
                </select>
            </div>
            <table className="tabel">
                <thead>
                    <tr>
                        <th className="cellStyle">Getal</th>
                        <th className="cellStyle">Gemiddeld</th>
                        {/* <th className="cellStyle">Beste</th> */}
                    </tr>
                </thead>
                <tbody>
                    {gemiddelde.map((waarde, index) => (
                        <tr key={index}>
                            <td className="cellStyle">{index + 1}</td>
                            <td className="cellStyle">{waarde.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
