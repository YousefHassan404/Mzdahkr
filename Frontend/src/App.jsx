import React, { useState } from "react";

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [diffImage, setDiffImage] = useState(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image1 || !image2) {
      setError("Please upload both images");
      return;
    }

    setLoading(true);
    setDiffImage(null);
    setReport("");
    setError(null);

    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await fetch("http://localhost:3000/api/compare", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const imagePrefix = "data:image/png;base64,";
      const diffImageData = data.diffImage.startsWith("data:")
        ? data.diffImage
        : imagePrefix + data.diffImage;

      setDiffImage(diffImageData);
      setReport(data.summary);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageReset = () => {
    setImage1(null);
    setImage2(null);
    setDiffImage(null);
    setReport("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="relative z-10 p-6 md:p-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Image Comparison
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered visual difference detection with stunning heatmap visualization
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          {/* Enhanced Upload Card */}
          <div className="group">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15">
              <div className="flex items-center justify-center mb-8">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white ml-4 tracking-tight">
                  Upload Images
                </h2>
              </div>

              <div onSubmit={handleUpload} className="space-y-8">
                {[image1, image2].map((image, i) => (
                  <div key={i} className="group/upload">
                    <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
                      {i === 0 ? "🖼️ First Image" : "🖼️ Second Image"}
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-500/50 bg-white/5 group-hover/upload:border-purple-400 group-hover/upload:bg-purple-500/10 rounded-3xl cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg hover:shadow-purple-500/20">
                      {image ? (
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${i + 1}`}
                            className="max-h-48 max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover/upload:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl group-hover/upload:from-transparent transition-all duration-300" />
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            ✓ Ready
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 group-hover/upload:text-purple-300 transition-colors p-8">
                          <div className="relative">
                            <svg className="w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover/upload:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-75"></div>
                          </div>
                          <p className="font-semibold text-lg mb-2">Drop your image here</p>
                          <p className="text-sm opacity-75 mb-2">or click to browse</p>
                          <div className="inline-flex items-center space-x-2 text-xs bg-white/10 px-3 py-1 rounded-full">
                            <span>PNG</span>
                            <span>•</span>
                            <span>JPG</span>
                            <span>•</span>
                            <span>JPEG</span>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => i === 0 ? setImage1(e.target.files[0]) : setImage2(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleUpload}
                    className={`group flex-1 relative overflow-hidden py-5 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-xl transform ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95 hover:scale-105"
                    } flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Magic...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Compare Images
                      </>
                    )}
                  </button>

                  {(image1 || image2) && (
                    <button
                      type="button"
                      onClick={handleImageReset}
                      className="flex-1 py-5 px-8 rounded-2xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 transform active:scale-95 hover:scale-105 flex items-center justify-center backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset All
                    </button>
                  )}
                </div>

                {error && (
                  <div className="mt-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-200 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Oops! Something went wrong</h4>
                      <p>{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Heatmap Result */}
          {diffImage && (
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-orange-500/25 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                      Difference Heatmap
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">Visualizing detected changes</p>
                  </div>
                </div>
                <div className="relative group/image">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-600 rounded-3xl blur opacity-25 group-hover/image:opacity-40 transition-opacity duration-300"></div>
                  <img
                    src={diffImage}
                    alt="Difference Heatmap"
                    className="relative rounded-2xl w-full h-auto shadow-2xl border border-white/10 transition-all duration-300 group-hover/image:scale-[1.02]"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔥 Heat Map
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Report Section */}
        {report && (
          <div className="mt-12 max-w-7xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:bg-white/15">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                      AI Analysis Report
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">Detailed comparison insights</p>
                  </div>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(report)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-2xl transition-all flex items-center font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Report
                </button>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed">
                  {report.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0 text-justify hover:text-white transition-colors duration-200">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Statistics Footer */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/20 p-4 rounded-xl text-center border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-300">AI</div>
                  <div className="text-sm text-gray-300">Powered Analysis</div>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-xl text-center border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-300">⚡</div>
                  <div className="text-sm text-gray-300">Lightning Fast</div>
                </div>
                <div className="bg-green-500/20 p-4 rounded-xl text-center border border-green-500/30">
                  <div className="text-2xl font-bold text-green-300">✓</div>
                  <div className="text-sm text-gray-300">High Precision</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">Powered by advanced AI • Built with ❤️ for pixel-perfect comparisons</p>
        </div>
      </div>
    </div>
  );
}

export default App;