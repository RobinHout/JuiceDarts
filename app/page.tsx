"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { supabase } from "./lib/supabaseClient";

type Gebruiker = {
    id: number;
    name: string;
};
type score = {
    id: number;
    userName: string;
    eersteTwintig: number;
    totaal: number;
    datum: number;
};

export default function Home() {
    const [naam, setNaam] = useState("");
    const [opties, setOpties] = useState<Gebruiker[]>([]);
    const [scores, setScores] = useState<score[]>([]);

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
        const fetchScores = async () => {
            const { data: rondjeScore, error } = await supabase
                .from("rondjeScore")
                .select("*");
            if (error) console.error(error);
            else {
                setScores(rondjeScore);
                console.log("Hallo" + rondjeScore);
            }
        };
        fetchUsers();
        fetchScores();
    }, []);

    const voerIn = () => {
        console.log("iets");
    };

    return (
        <>
            {/* <div className="Titel">Kies een naam:</div> */}
            <div className="inputvelden">
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
                <input
                    name="eerste20"
                    className="input"
                    placeholder="Eerste 20"
                ></input>
                <input
                    name="totaal"
                    className="input"
                    placeholder="Totaal"
                ></input>
                <button onClick={voerIn} className="input">
                    Submit
                </button>
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
                    {scores.map((score) => (
                        <tr key={score.id}>
                            <td className="cellStyle">{score.userName}</td>
                            <td className="cellStyle">{score.eersteTwintig}</td>
                            <td className="cellStyle">{score.totaal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
