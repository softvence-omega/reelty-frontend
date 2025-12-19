import { X } from 'lucide-react';
import { Link } from 'react-router';

const EmailVerifyFailed = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center">
        {/* Error Symbol */}
        <div className="w-20 h-20 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="w-12 h-12 text-black" />
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-black mb-4">Verification Failed</h1>
        <p className="text-gray-700 mb-8">
          The verification link is invalid or has expired.
        </p>

        {/* Action */}
        <div className="space-y-3">
         <Link to='/auth/login'>
          <button className="w-full border border-black text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Back to Login
          </button>
         </Link>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Help Text */}
        <p className="text-sm text-gray-600">
          Need help? Contact{' '}
          <span className="font-semibold text-black">support@company.com</span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerifyFailed;