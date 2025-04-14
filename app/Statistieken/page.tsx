"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "../types/types";

export default function Statistieken() {
    const [naam, setNaam] = useState("Robin");
    const [opties, setOpties] = useState<User[]>([]);
    const [gemiddelde, setGemiddelde] = useState<number[]>([]);

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
        fetchScores(naam);
    }, []);

    const fetchScores = async (nieuweNaam: string) => {
        for (let i = 1; i < 5; i++) {
            let totaal = 0;
            let tijdelijkGemiddelde = 0;
            const { data: rondjeScore, error } = await supabase
                .from("rondjeUitgebreid")
                .select(String(i))
                .eq("userName", nieuweNaam);
            if (error) console.error(error);
            else {
                console.log(rondjeScore);
                for (const waarde in rondjeScore) {
                    if (Number(waarde) !== 0 && waarde !== null)
                        console.log(totaal, "waarde:", Number(waarde));
                    totaal += Number(waarde);
                }
                console.log(totaal);
                tijdelijkGemiddelde = totaal / rondjeScore.length;
                console.log(tijdelijkGemiddelde);

                setGemiddelde((x) => [...x, tijdelijkGemiddelde]);
            }
        }
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
                        fetchScores(e.target.value);
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
                        <th className="cellStyle">Beste</th>
                    </tr>
                </thead>
                <tbody>
                    {gemiddelde.map((gemiddelde, index) => (
                        <tr className="block" key={index}>
                            <td className="cellStyle">{index}</td>
                            <td className="cellStyle">{gemiddelde}</td>
                        </tr>
                        // <tr key={score.Id}>
                        //     <td className="cellStyle">{score.userName}</td>
                        //     <td className="cellStyle">{score.eersteTwintig}</td>
                        //     <td className="cellStyle">{score.totaal}</td>
                        // </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
