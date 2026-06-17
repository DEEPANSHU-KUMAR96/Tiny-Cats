import React, { useEffect, useState } from "react";
import { adoptionService } from "../services/adoption.service";
import type { IAdoptionRequestPopulated, AdoptionStatus } from "../types/adoption.types";
import { AdoptionStatusBadge } from "../components/AdoptionStatusBadge";
import { CatImage } from "../../components/ui/CatImage";
import { useAuth } from "../../auth";
import {
  Loader2,
  Check,
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Shield,
  FileText,
  Clock,
  Heart,
} from "lucide-react";
import { Navigate, Link } from "react-router-dom";

export const AdminDashboardPage: React.FC = () => {
  const { user: currentUser } = useAuth();

  const [requests, setRequests] = useState<IAdoptionRequestPopulated[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | AdoptionStatus>("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Security check: Redirect non-admins
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adoptionService.getAllRequests();
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

  const handleApprove = async (id: string) => {
    setActionLoadingId(id);
    try {
      await adoptionService.approveRequest(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "approved" as const } : r))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to approve request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoadingId(id);
    try {
      await adoptionService.rejectRequest(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "rejected" as const } : r))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Failed to reject request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredRequests = requests.filter(
    (req) => activeTab === "all" || req.status === activeTab
  );

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 animate-[fade-in_0.3s_ease-out_forwards]">
        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#FF6B9D] border border-pink-100 shadow-sm">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-sm font-semibold text-[#FF6B9D]">Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 bg-red-50 rounded-3xl border border-red-100 text-center animate-[fade-in_0.3s_ease-out_forwards]">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#1A0A10] mb-1">Error Loading Data</h3>
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
    <div className="space-y-6 max-w-6xl mx-auto px-2">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FF6B9D] via-[#FF8FAB] to-[#C9184A] rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/8 opacity-10 font-bold text-9xl pointer-events-none select-none">
          🐾
        </div>
        <div className="relative space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Adoption Approvals
          </h1>
          <p className="text-sm md:text-base text-white/85">
            Review applicant profiles, check details, and approve or reject adoption requests.
          </p>
        </div>
      </div>

      {/* Tabs / Filters & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-pink-100/40 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const tabLabels = {
              all: "All Requests",
              pending: "Pending",
              approved: "Approved",
              rejected: "Rejected",
            };
            const count =
              tab === "all"
                ? requests.length
                : requests.filter((r) => r.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF6B9D] text-white shadow-sm"
                    : "text-[#1A0A10]/60 hover:bg-[#FFF0F6] hover:text-[#FF6B9D]"
                }`}
              >
                {tabLabels[tab]} ({count})
              </button>
            );
          })}
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/50 py-1.5 px-3 rounded-xl">
            <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{pendingCount} Pending Approval</span>
          </div>
        )}
      </div>

      {/* Requests Content */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-pink-100/40 shadow-[0_8px_32px_rgba(255,107,157,0.06)] text-center max-w-xl mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#1A0A10]">No requests found</h3>
          <p className="text-sm text-[#1A0A10]/60">
            There are no requests matching the selected category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-3xl border border-pink-100/40 shadow-[0_8px_32px_rgba(255,107,157,0.08)] overflow-hidden hover:border-[#FF6B9D]/20 transition-all duration-300"
            >
              {/* Application Details Main Area */}
              <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* 1. Cat Thumbnail Info (3 cols) */}
                <div className="md:col-span-3 flex md:flex-col gap-4 items-center md:items-start text-center md:text-left md:border-r border-pink-50 md:pr-6">
                  <div className="w-20 h-20 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-sm shrink-0 border border-pink-100/30">
                    <CatImage
                      src={request.catId.image}
                      alt={request.catId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 space-y-1 w-full">
                    <h3 className="text-lg font-bold text-[#1A0A10] truncate">
                      {request.catId.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#FF8FAB] uppercase tracking-wider truncate">
                      {request.catId.breed}
                    </p>
                    <div className="pt-2 md:pt-1">
                      <Link
                        to={`/cats/${request.catId._id}`}
                        className="text-xs font-bold text-[#FF6B9D] hover:text-[#C9184A] transition-colors"
                      >
                        Cat Details →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. User Info (4 cols) */}
                <div className="md:col-span-4 space-y-3 md:border-r border-pink-50 md:px-6">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#1A0A10]/50 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-[#FF8FAB]" />
                    <span>Applicant Profile</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-[#1A0A10]">
                      {request.userId?.name || "Unknown User"}
                    </h4>
                    <div className="space-y-1.5 text-xs text-[#1A0A10]/70">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#FF8FAB] shrink-0" />
                        <span className="truncate">{request.userId?.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#FF8FAB] shrink-0" />
                        <span>{request.userId?.mobile || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Application Notes (5 cols) */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4 md:pl-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-bold text-[#1A0A10]/50 uppercase tracking-wider">
                        <MessageSquare className="w-3.5 h-3.5 text-[#FF8FAB]" />
                        <span>Adoption Message</span>
                      </div>
                      <span className="text-[10px] text-[#1A0A10]/40 font-medium">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    <div className="bg-[#FFF0F6] rounded-2xl p-4 border border-pink-50 flex-grow min-h-[80px]">
                      {request.message ? (
                        <p className="text-xs text-[#1A0A10]/70 leading-relaxed italic">
                          "{request.message}"
                        </p>
                      ) : (
                        <p className="text-xs text-[#1A0A10]/40 leading-relaxed italic">
                          No custom message provided by the applicant.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status & Action Buttons */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div>
                      <AdoptionStatusBadge status={request.status} />
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={actionLoadingId === request._id}
                          className="p-2.5 rounded-xl border border-rose-100 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Reject Adoption"
                        >
                          {actionLoadingId === request._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleApprove(request._id)}
                          disabled={actionLoadingId === request._id}
                          className="py-2.5 px-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          {actionLoadingId === request._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          <span>Approve</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AdminDashboardPage;
