import { useLoaderData } from "react-router-dom";
import PDF_Uploader from "./PDF-Uploader";

export async function dailyNewsLoader() {
    const response = await fetch(`http://localhost:3000/pdf/fc174804d8a23fd717e1b02092c7fd47.pdf`);
    
    const pdf = await response.json();
    return { pdf };
}

export default function DailyNews() {

    return (
        <div className="flex flex-col items-center">
            <PDF_Uploader />
        </div>
    )
}