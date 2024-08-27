import  { useState } from "react";
import axios from "axios";

const CompleteTask = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file");
        }
    };

    return (
        <div>
            <h2>Please Attach Your File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CompleteTask;
