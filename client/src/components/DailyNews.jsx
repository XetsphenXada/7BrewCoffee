import { useLoaderData } from "react-router-dom";
import PDF_Uploader from "./PDF-Uploader";
import { useState } from "react";

export async function dailyNewsLoader() {
    const pdfResponse = await fetch("http://localhost:3000/pdf");
    const pdfBody = await pdfResponse.json();
    return pdfBody.data;
}

export default function DailyNews() {
    const pdfBody = useLoaderData();
    const [pdf, setPdf] = useState(pdfBody);
    console.log(pdf)

    return (
        <div className="flex flex-col items-center">
            <PDF_Uploader />
        </div>
    )
}