export class TradeRequest
{
    requestId!: number;
    userAId!: number;
    userBId!: number;
    comicABookId!: number;
    comicBBookId!: number;
    status!: string;
    userAReceived!: boolean;
    userBReceived!: boolean;
}