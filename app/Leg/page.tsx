"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

const users = [
    { id: "1", name: "Robin" },
    { id: "2", name: "Jack" },
    { id: "3", name: "Siebe" },
    { id: "4", name: "Bart" },
    { id: "5", name: "Koos" },
    { id: "6", name: "Test" },
];

export default function Leg() {
    const [score, setScore] = useState(501);
    const [pijlen, setPijlen] = useState(0);
    const [totHonderd, setTotHonderd] = useState(0);
    const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);
    const [finish, setFinish] = useState(false);
    const [selectedUser, setSelectedUser] = useState(""); //user gaat weg
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
    const router = useRouter();

    function gegooid(x: number) {
        setPijlen(pijlen + 1);
        if (score - x === 0 && multiplier === 2) {
            // Uitgegooid
            setScore(0);
            setFinish(true);
            return;
        }
        if (score - x < 2) return; // Te hoog gegooid
        setMultiplier(1);
        if (score - x < 100 && totHonderd < 1) {
            setTotHonderd(pijlen + 1);
        }
        setScore(score - x);
    }

    const klaar = async () => {
        const { error } = await supabase
            .from("Leg")
            .insert([
                {
                    User: selectedUser,
                    TotHonderd: totHonderd,
                    Totaal: pijlen,
                },
            ])
            .select();
        if (error) {
            console.error("Fout bij opslaan van scores:", error.message);
        } else {
            console.log("Scores succesvol opgeslagen!");
            router.push("/");
        }
    };

    return (
        <div>
            {finish ? (
                <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-sm space-y-4 ">
                        <div className="rounded-2xl p-4 text-center space-y-3">
                            <div>
                                <div className="text-2xl text-gray-600">
                                    Gegooide pijlen
                                </div>
                                <div className="text-6xl font-extrabold tabular-nums">
                                    {pijlen}
                                </div>
                            </div>
                            <div>
                                <div className="text-xl text-gray-600">
                                    Gegooide pijlen tot 100
                                </div>
                                <div className="text-4xl font-bold tabular-nums">
                                    {totHonderd ?? "-"}
                                </div>
                            </div>
                        </div>

                        <select
                            className=" rounded-xl border px-3 py-2"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="" disabled>
                                Kies gebruiker…
                            </option>
                            {users.map((u) => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="w-full rounded-2xl border border-black bg-black text-white font-medium py-3 active:scale-95"
                            onClick={klaar}
                        >
                            Klaar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-sm mx-auto p-4 select-none">
                    <div className="min-h-[30vh] w-full flex flex-col items-center justify-center">
                        <div className="text-7xl font-extrabold tracking-tight tabular-nums text-center">
                            {score}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            Gegooide pijlen: {pijlen}
                        </div>
                    </div>
                    <fieldset className="mb-4" aria-label="Bull">
                        <div
                            className="grid grid-cols-3 gap-2"
                            role="radiogroup"
                        >
                            {[
                                { key: 1 as const, label: "Mis", value: 0 },
                                { key: 2 as const, label: "Bull", value: 25 },
                                {
                                    key: 3 as const,
                                    label: "Bullseye",
                                    value: 50,
                                },
                            ].map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    value={opt.key}
                                    onClick={() => gegooid(opt.value)}
                                    className="h-10 rounded-xl border border-gray-300 text-lg flex items-center justify-center active:scale-95 transition"
                                    aria-label={opt.label}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset className="mb-4" aria-label="Multiplier">
                        <div
                            className="grid grid-cols-3 gap-2"
                            role="radiogroup"
                        >
                            {[
                                { key: 1 as const, label: "Enkel" },
                                { key: 2 as const, label: "Dubbel" },
                                { key: 3 as const, label: "Tripel" },
                            ].map((opt) => (
                                <label
                                    key={opt.key}
                                    className={`rounded-2xl border px-3 py-2 text-center text-sm font-medium transition active:scale-95 ${
                                        multiplier === opt.key
                                            ? "border-black shadow-sm"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="multiplier"
                                        value={opt.key}
                                        checked={multiplier === opt.key}
                                        onChange={() => setMultiplier(opt.key)}
                                        className="sr-only"
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {/* Grid 1..20 */}
                    <div className="grid grid-cols-5 gap-2">
                        {numbers.map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => gegooid(n * multiplier)}
                                className="aspect-square rounded-xl border border-gray-300 text-lg font-semibold flex items-center justify-center active:scale-95 transition"
                                aria-label={`${n} maal ${multiplier}`}
                            >
                                <div className="text-center leading-tight">
                                    <div>{n}</div>
                                    <div className="text-[11px] opacity-70">
                                        {n * multiplier}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
