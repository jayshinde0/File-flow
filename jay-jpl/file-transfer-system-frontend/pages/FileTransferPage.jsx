import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, DownloadCloud, File, List, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const FileTransferPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const fileInputRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Fetch file list
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/files/list`);
        setFileList(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [API_BASE_URL]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadStatus('uploading');
      const response = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setUploadStatus('success');
      setSelectedFile(null);
      // Refresh file list
      const listResponse = await axios.get(`${API_BASE_URL}/files/list`);
      setFileList(listResponse.data);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus('error');
    } finally {
      setTimeout(() => setUploadStatus(null), 5000);
    }
  };

  // Handle file download
  const handleDownload = async (fileName) => {
    try {
      setDownloadStatus({ fileName, status: 'downloading' });
      const response = await axios.get(`${API_BASE_URL}/files/download/${fileName}`, {
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus({ fileName, status: 'success' });
    } catch (error) {
      console.error("Download error:", error);
      setDownloadStatus({ fileName, status: 'error' });
    } finally {
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          variants={itemVariants}
        >
          File Transfer
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          variants={itemVariants}
        >
          Securely upload and download files with end-to-end encryption
        </motion.p>

        {/* Upload Section */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UploadCloud className="w-5 h-5 mr-2 text-indigo-600" />
                Upload Files
              </h2>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  selectedFile ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <File className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button 
                      className="mt-3 text-sm text-red-500 hover:text-red-700 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-1">
                      <span className="text-indigo-600 font-medium">Click to browse</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">Supports all file types</p>
                  </>
                )}
              </div>
              
              {uploadStatus === 'uploading' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {uploadStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-md flex items-center ${
                    uploadStatus === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {uploadStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  )}
                  <span>
                    {uploadStatus === 'success' 
                      ? 'File uploaded successfully!' 
                      : 'Error uploading file. Please try again.'}
                  </span>
                </motion.div>
              )}
            </div>
            
            <div className="md:w-px md:h-24 bg-gray-200"></div>
            
            <div className="flex flex-col justify-center">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === 'uploading'}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                  selectedFile 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {uploadStatus === 'uploading' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 mr-2" />
                    Upload File
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500 mt-3 text-center">
                Files are encrypted during transfer
              </p>
            </div>
          </div>
        </motion.div>

        {/* File List Section */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <List className="w-5 h-5 mr-2 text-indigo-600" />
            Available Files
          </h2>
          
          {fileList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No files available yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fileList.map((fileName) => (
                <motion.div
                  key={fileName}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <File className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900 truncate max-w-xs">
                      {fileName}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(fileName)}
                    disabled={downloadStatus?.fileName === fileName && downloadStatus?.status === 'downloading'}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 flex items-center"
                  >
                    {downloadStatus?.fileName === fileName && downloadStatus?.status === 'downloading' ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <DownloadCloud className="w-4 h-4 mr-1" />
                    )}
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          )}
          
          {downloadStatus?.status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Download started for {downloadStatus.fileName}</span>
            </motion.div>
          )}
          
          {downloadStatus?.status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Error downloading {downloadStatus.fileName}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileTransferPage;