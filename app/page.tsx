"use client";
import { useState } from "react";
import "./globals.css";

export default function Home() {
    const [naam, setNaam] = useState("");

    const opties = ["Robin", "Siebe", "Jacky", "Bart"];

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
                    <option value="">Naam</option>
                    {opties.map((optie) => (
                        <option key={optie} value={optie}>
                            {optie}
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
            </div>
        </>
    );
}
