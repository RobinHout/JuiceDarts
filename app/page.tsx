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
    const [naam, setNaam] = useState("Robin");
    const [twintig, setTwintig] = useState("");
    const [totaalScore, setTotaalScore] = useState("");
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
        fetchUsers();
        fetchScores();
    }, []);
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
    const uploadScore = async () => {
        const { error } = await supabase
            .from("rondjeScore")
            .insert([
                { userName: naam, eersteTwintig: twintig, totaal: totaalScore },
            ])
            .select();
        if (error) {
            console.error("Fout bij uploaden:", error.message);
        } else {
            setTwintig("");
            setTotaalScore("");
            fetchScores();
        }
    };

    const voerIn = () => {
        console.log("iets");
        uploadScore();
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
                    value={twintig}
                    onChange={(e) => setTwintig(e.target.value)}
                ></input>
                <input
                    name="totaal"
                    className="input"
                    placeholder="Totaal"
                    value={totaalScore}
                    onChange={(e) => setTotaalScore(e.target.value)}
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
