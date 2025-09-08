"use client";
import { useState } from "react";
import { Score } from "../types/types";

export default function Page() {
    const [form, setForm] = useState({ User: "", Twintig: "", Totaal: "" });
    const [rows, setRows] = useState<Score[]>([]);

    async function load() {
        const res = await fetch("api/data", { cache: "no-store" });
        setRows(await res.json());
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        await fetch("api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ User: "", Twintig: "", Totaal: "" });
        await load();
    }

    return (
        <main className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">CSV Demo</h1>

            <form onSubmit={submit} className="space-y-3">
                <input
                    className="border rounded p-2 w-full"
                    placeholder="User"
                    value={form.User}
                    onChange={(e) =>
                        setForm((s) => ({ ...s, User: e.target.value }))
                    }
                />
                <input
                    className="border rounded p-2 w-full"
                    placeholder="Twintig"
                    value={form.Twintig}
                    onChange={(e) =>
                        setForm((s) => ({ ...s, Twintig: e.target.value }))
                    }
                />
                <input
                    className="border rounded p-2 w-full"
                    placeholder="Totaal"
                    value={form.Totaal}
                    onChange={(e) =>
                        setForm((s) => ({ ...s, Totaal: e.target.value }))
                    }
                />
                <button className="border rounded px-4 py-2" type="submit">
                    Add Row
                </button>
                <button
                    className="border rounded px-4 py-2 ml-2"
                    type="button"
                    onClick={load}
                >
                    Load CSV
                </button>
            </form>

            <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
                {rows.length === 0
                    ? "No rows yet."
                    : rows
                          .map(
                              (r) =>
                                  `${r.User}\t${r.Twintig}\t${r.Totaal}\t${
                                      r.Date ?? ""
                                  }`
                          )
                          .join("\n")}
            </pre>
        </main>
    );
}
