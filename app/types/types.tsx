export type User = {
    id: number;
    userName: string;
};
export type rondjeScore = {
    gameId: number;
    userName: string;
    eersteTwintig: number;
    totaal: number;
    date: string;
};
export type Score = {
    UserName: string;
    EersteTwintig: number;
    Totaal: number;
    date: string;
};
export type Leg = {
    User: string;
    TotHonderd: number;
    Totaal: number;
    date: string;
};
