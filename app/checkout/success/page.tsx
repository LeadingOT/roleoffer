import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    session_id: string;
    role: string; 
    level: string; 
    stage: string; 
    location: string;
  }>;
}) {
  const params = await searchParams;
  const { session_id, role, level, stage, location } = params;

  if (!session_id || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid session</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Build download URL
  const downloadUrl = `/api/download?session_id=${session_id}&role=${role}&level=${level}&stage=${stage}&location=${location}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful! 🎉</h1>
            <p className="text-xl text-gray-600">
              Your compensation report is ready
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">Order Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Role</span>
                <span className="font-semibold">{role}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Level</span>
                <span className="font-semibold">{level}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Stage</span>
                <span className="font-semibold">{stage}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold">{location}</span>
              </div>
              <div className="flex justify-between py-2 border-b-2 border-gray-200">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-sm">{session_id}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-lg font-semibold">Total Paid</span>
                <span className="text-2xl font-bold text-green-600">$49.00</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-3">
              <a 
                href={downloadUrl}
                download
                className="block w-full"
              >
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg py-6">
                  📄 Download PDF Report
                </Button>
              </a>
              
              <Link 
                href={`/report?session_id=${session_id}&role=${role}&level=${level}&stage=${stage}&location=${location}`}
                className="block w-full"
              >
                <Button size="lg" variant="outline" className="w-full text-lg py-6">
                  👁️ View Online Report
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              📧 A copy has been sent to your email (if provided)
            </p>
          </div>

          {/* What's Included */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-6">What's Included in Your Report</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="font-semibold">Complete Benchmarks</div>
                  <div className="text-sm text-blue-100">P10-P90 percentiles for base + equity</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <div className="font-semibold">Offer Letter Template</div>
                  <div className="text-sm text-blue-100">Pre-filled and ready to customize</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="font-semibold">Equity Calculator</div>
                  <div className="text-sm text-blue-100">4-year vesting with 3 exit scenarios</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-semibold">Messaging Templates</div>
                  <div className="text-sm text-blue-100">How to present & negotiate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Questions? Issues downloading?
            </p>
            <a href="mailto:support@roleoffer.com" className="text-indigo-600 font-semibold hover:underline">
              support@roleoffer.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
