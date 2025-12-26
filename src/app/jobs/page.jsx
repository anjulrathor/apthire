"use client";
import React, { useEffect } from 'react';
import JobsList from '@/components/jobs/JobsList';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const JobsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role === 'admin') {
        router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading) return null; // Or a spinner

  return (
    <div>
        <JobsList />
    </div>
  );
}

export default JobsPage;
