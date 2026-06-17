import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import { adoptionService } from "../services/adoption.service";
import { Loader2, Heart, X, Check } from "lucide-react";

interface AdoptButtonProps {
  catId: string;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ catId }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is Admin, they shouldn't request adoption
  if (user && user.role === "admin") {
    return null;
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setMessage("");
    setError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setError(null);

    try {
      await adoptionService.createAdoptionRequest({
        catId,
        message: message.trim() || undefined,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: any) {
      const serverMessage =
        err.response?.data?.message || err.message || "Failed to submit request";
      setError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = isOpen
    ? createPortal(
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[9999] bg-[#1A0A10]/40 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ animation: "fade-in 0.2s ease-out" }}
        >
          {/* Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 border border-pink-100 max-w-md w-full shadow-2xl relative"
            style={{ animation: "slide-up 0.3s ease-out forwards" }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#FF6B9D] p-1.5 rounded-xl hover:bg-[#FFF0F6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-4 shadow-sm animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#1A0A10] mb-2">Adoption Request Sent!</h3>
                <p className="text-sm text-[#1A0A10]/60">
                  We've received your request. The admin will review it soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-2">
                  <span className="text-2xl">🐾</span>
                  <h3 className="text-xl font-bold text-[#1A0A10] mt-2">Adopt this Cutie</h3>
                  <p className="text-xs text-[#1A0A10]/60 mt-1">
                    Tell us why you want to adopt this cat. The admin will read this message before deciding.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-semibold">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="adopt-message"
                    className="block text-xs font-bold text-[#1A0A10]/70 uppercase tracking-wider mb-1.5"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="adopt-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a warm note about your home, family, or experience with pets..."
                    className="w-full rounded-2xl border border-pink-100 p-3 text-sm focus:border-[#FF6B9D] focus:ring-1 focus:ring-[#FF6B9D] outline-none transition-colors resize-none placeholder-gray-400 text-[#1A0A10]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-pink-100 text-gray-500 hover:bg-[#FFF0F6] hover:text-[#FF6B9D] transition-all text-sm font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] text-white hover:from-[#C9184A] hover:to-[#A4133C] transition-all font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-pink-100 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] text-white hover:from-[#C9184A] hover:to-[#A4133C] transition-all duration-300 font-bold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-pink-100 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      >
        <Heart className="w-4 h-4 fill-white" />
        <span>Adopt Me 🐾</span>
      </button>
      {modal}
    </>
  );
};
export default AdoptButton;
