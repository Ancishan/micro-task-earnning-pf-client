const FileShow = ({ files }) => {
    console.log("Files received in FileShow:", files); // Debugging line
    
    return (
      <div className='mt-10 mb-10'>
        <h2>Uploaded Files</h2>
        <ul>
          {files && files.length > 0 ? (
            files.map((file, index) => (
              <li key={index}>
                <a href={`http://localhost:8000/uploads/${file}`} download>
                  {file}
                </a>
              </li>
            ))
          ) : (
            <p>No files available</p>
          )}
        </ul>
      </div>
    );
  };
  
  export default FileShow;
  