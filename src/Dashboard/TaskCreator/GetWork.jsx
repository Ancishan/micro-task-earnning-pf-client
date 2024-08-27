import React, { useEffect, useState } from "react";
import axios from "axios";

const GetWork = () => {
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get("http://localhost:8000/file-url");
                setFileUrl(response.data.fileUrl);
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        };

        fetchFile();
    }, []);

    return (
        <div>
            <h1>See Your Task Work</h1>
            {fileUrl ? (
                <a href={fileUrl} download>
                    Download File
                </a>
            ) : (
                <p>No file available</p>
            )}
        </div>
    );
};

export default GetWork;
