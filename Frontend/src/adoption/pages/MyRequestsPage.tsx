import React, { useEffect, useState } from "react";
import { adoptionService } from "../services/adoption.service";
import type { IAdoptionRequestMyRequests } from "../types/adoption.types";
import { AdoptionStatusBadge } from "../components/AdoptionStatusBadge";
import { CatImage } from "../../components/ui/CatImage";
import { Loader2, HeartHandshake, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const MyRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<IAdoptionRequestMyRequests[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adoptionService.getMyRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 animate-[fade-in_0.3s_ease-out_forwards]">
        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF6B9D] border border-pink-100 shadow-sm">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-sm font-semibold text-[#FF6B9D]">Loading your requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 bg-red-50 rounded-3xl border border-red-100 text-center animate-[fade-in_0.3s_ease-out_forwards]">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#1A0A10] mb-1">Failed to Load Requests</h3>
        <p className="text-sm text-red-600/80 mb-4">{error}</p>
        <button
          onClick={fetchRequests}
          className="py-2 px-4 rounded-xl bg-red-600 text-white hover:bg-red-700 font-semibold text-sm transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#1A0A10] flex items-center gap-2">
          <span>🐾</span> My Adoption Requests
        </h1>
        <p className="text-sm text-[#1A0A10]/60">
          Track the status of your adoption applications for our tiny cats.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-pink-100/40 shadow-[0_8px_32px_rgba(255,107,157,0.06)] text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FFF0F6] text-[#FF6B9D] flex items-center justify-center mx-auto shadow-sm">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#1A0A10]">No requests found</h3>
            <p className="text-sm text-[#1A0A10]/60">
              You haven't requested to adopt any cats yet. Find a cat to start your journey!
            </p>
          </div>
          <Link
            to="/cats"
            className="inline-block py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] text-white hover:from-[#C9184A] hover:to-[#A4133C] transition-all font-bold text-sm shadow-md shadow-pink-100 cursor-pointer"
          >
            Browse Cats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-3xl p-5 border border-pink-100/40 shadow-[0_8px_32px_rgba(255,107,157,0.08)] flex flex-col h-full hover:border-[#FF6B9D]/20 transition-all duration-300"
            >
              {/* Cat Header Section */}
              <div className="flex gap-4 items-start pb-4 border-b border-pink-50/60">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  <CatImage
                    src={request.catId.image}
                    alt={request.catId.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-lg font-bold text-[#1A0A10] truncate">
                    {request.catId.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#FF8FAB] uppercase tracking-wider truncate">
                    {request.catId.breed}
                  </p>
                  <div className="pt-1">
                    <AdoptionStatusBadge status={request.status} />
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="py-4 flex-grow space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#1A0A10]/50 font-medium">
                  <Calendar className="w-4 h-4 text-[#FF8FAB]" />
                  <span>Submitted on {formatDate(request.createdAt)}</span>
                </div>

                {request.message && (
                  <div className="bg-[#FFF0F6] rounded-2xl p-3 border border-pink-50 flex gap-2 items-start">
                    <MessageSquare className="w-4 h-4 text-[#FF6B9D] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#1A0A10]/70 leading-relaxed italic">
                      "{request.message}"
                    </div>
                  </div>
                )}
              </div>

              {/* Action/Footer Link */}
              <div className="pt-3 border-t border-pink-50/60 mt-auto flex justify-end">
                <Link
                  to={`/cats/${request.catId._id}`}
                  className="text-xs font-bold text-[#FF6B9D] hover:text-[#C9184A] transition-colors"
                >
                  View Cat Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyRequestsPage;
