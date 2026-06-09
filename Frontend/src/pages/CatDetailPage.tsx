import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCats } from '../hooks/useCats';
import { CatDetail } from '../components/cats/CatDetail';
import { CatPawSpinner } from '../components/ui/Loader';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
export const CatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cat, fetchCatById, loading, error } = useCats();
  useEffect(() => {
    if (id) {
      fetchCatById(id);
    }
  }, [id, fetchCatById]);
  return (
    <div className="page-transition w-full min-h-[500px]">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <CatPawSpinner text="Retrieving cat details..." />
        </div>
      )}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 max-w-md mx-auto text-center space-y-4 shadow-sm my-12">
          <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-[#C9184A] mx-auto font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1A0A10]">Failed to load cat details</h3>
          <p className="text-sm text-gray-500">{error}</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/cats')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {id && (
              <Button variant="accent" onClick={() => fetchCatById(id)}>
                Retry
              </Button>
            )}
          </div>
        </div>
      )}
      {!loading && !error && cat && <CatDetail cat={cat} />}
    </div>
  );
};