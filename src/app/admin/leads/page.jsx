"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Trash2, ExternalLink, Mail, User, Calendar } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function AdminLeadsPage() {
  const { user } = useAuth();
  const { error: toastError, success } = useToast();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch leads");
      setLeads(data);
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) throw new Error("Delete failed");
      
      setLeads(leads.filter(l => l._id !== id));
      success("Lead deleted successfully");
    } catch (err) {
      toastError(err.message);
    }
  };

  if (loading) return <div className="text-white">Loading leads...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Leads</h1>
          <p className="text-gray-500">Inbound messages from the contact form</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-lg text-sm font-bold border border-emerald-500/20">
          {leads.length} Total Messages
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.length === 0 ? (
          <div className="p-12 text-center bg-white/5 border border-white/5 rounded-3xl">
            <p className="text-gray-500">No leads found yet.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead._id} className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleDelete(lead._id)}
                  className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Name</p>
                      <p className="text-white font-bold">{lead.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Email</p>
                      <a href={`mailto:${lead.email}`} className="text-white font-medium hover:text-emerald-400 underline underline-offset-4 decoration-white/20">{lead.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Submitted</p>
                      <p className="text-white font-medium">{new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-[#0a0a0a] rounded-2xl p-6 border border-white/5">
                   <p className="text-xs text-emerald-500 uppercase font-bold tracking-widest mb-3">Message Content</p>
                   <p className="text-gray-300 whitespace-pre-wrap leading-relaxed font-main">
                      {lead.message}
                   </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
