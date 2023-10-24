import prettyMilliseconds from "pretty-ms";

export const calculateRemainingTime = (durationInDays: number, createdAt: string) => {
    const durationInMs = durationInDays * 24 * 60 * 60 * 1000;
    const createdTimestamp = new Date(createdAt).getTime();
    const endingTimestamp = createdTimestamp + durationInMs;
    const todaysTimestamp = Date.now();
    const remainingTime = endingTimestamp - todaysTimestamp;

    return prettyMilliseconds(remainingTime, {compact: true});
};
