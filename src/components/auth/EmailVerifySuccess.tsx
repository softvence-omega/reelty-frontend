const EmailVerifySuccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-xs w-full text-center">
        
        {/* Check Icon */}
        <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-3xl font-bold">✓</div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-black mb-2">Verified</h1>
        <p className="text-gray-700 mb-6 text-sm">
          Email verification successful
        </p>

        {/* Button */}
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full bg-black text-white py-2.5 rounded font-medium text-sm hover:bg-gray-900 transition"
        >
          Continue
        </button>

        {/* Small Footer */}
        <p className="mt-4 text-xs text-gray-500">
          {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>

      </div>
    </div>
  );
};

export default EmailVerifySuccess;