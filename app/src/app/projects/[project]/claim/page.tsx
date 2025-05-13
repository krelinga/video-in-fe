"use client";

export default function ClaimDiscs({
    params
}: {
    params: {
        project: string;
}}) {
    return (
        <div>{params.project}</div>
    )
}