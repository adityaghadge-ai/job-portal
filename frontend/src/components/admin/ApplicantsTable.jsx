import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MoreHorizontal, FileText, CheckCircle, XCircle, MessageSquare, Sparkles, ArrowUpDown, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import WhatsAppModal from './WhatsAppModal';

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ isScanning, onTriggerAiScan }) => {
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    // Selected applicants for bulk WhatsApp messaging
    const [selectedApplicantIds, setSelectedApplicantIds] = useState([]);
    const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
    const [whatsAppTargetCandidates, setWhatsAppTargetCandidates] = useState([]);

    // Sort order state: 'ai-desc', 'ai-asc', 'date-desc', 'date-asc'
    const [sortOrder, setSortOrder] = useState('ai-desc');

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update local status in redux
                if (applicants?.applications) {
                    const updatedApps = applicants.applications.map(app => 
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    );
                    dispatch(setAllApplicants({ ...applicants, applications: updatedApps }));
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    // Toggle individual checkbox
    const handleToggleSelect = (id) => {
        if (selectedApplicantIds.includes(id)) {
            setSelectedApplicantIds(selectedApplicantIds.filter(item => item !== id));
        } else {
            setSelectedApplicantIds([...selectedApplicantIds, id]);
        }
    };

    // Select/Deselect All
    const handleSelectAll = () => {
        const allList = applicants?.applications || [];
        if (selectedApplicantIds.length === allList.length) {
            setSelectedApplicantIds([]);
        } else {
            setSelectedApplicantIds(allList.map(app => app._id));
        }
    };

    // Open WhatsApp modal for specific candidate or selected batch
    const openWhatsAppForCandidates = (candidatesList) => {
        if (!candidatesList || candidatesList.length === 0) {
            toast.error("Please select at least one candidate to message.");
            return;
        }
        setWhatsAppTargetCandidates(candidatesList);
        setWhatsAppModalOpen(true);
    };

    // Sort applicants dynamically
    const rawApplications = applicants?.applications ? [...applicants.applications] : [];
    
    const sortedApplications = rawApplications.sort((a, b) => {
        const scoreA = a.aiAnalysis?.matchScore || 0;
        const scoreB = b.aiAnalysis?.matchScore || 0;

        if (sortOrder === 'ai-desc') return scoreB - scoreA;
        if (sortOrder === 'ai-asc') return scoreA - scoreB;
        if (sortOrder === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOrder === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
        return 0;
    });

    const getScoreBadge = (score) => {
        if (!score && score !== 0) {
            return (
                <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 font-medium text-xs">
                    Not Scanned
                </Badge>
            );
        }
        if (score >= 80) {
            return (
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-2.5 py-1">
                    🎯 {score}% High Match
                </Badge>
            );
        }
        if (score >= 50) {
            return (
                <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-extrabold text-xs px-2.5 py-1">
                    ⚡ {score}% Med Match
                </Badge>
            );
        }
        return (
            <Badge className="bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs px-2.5 py-1">
                ⚠️ {score}% Low Match
            </Badge>
        );
    };

    return (
        <div className="space-y-4">
            {/* Action Bar & Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Sort Order Selector */}
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700">
                        <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                        <span>Rank Applicants:</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-transparent font-bold text-purple-700 focus:outline-none cursor-pointer"
                        >
                            <option value="ai-desc">AI Match Score (High → Low)</option>
                            <option value="ai-asc">AI Match Score (Low → High)</option>
                            <option value="date-desc">Applied Date (Newest)</option>
                            <option value="date-asc">Applied Date (Oldest)</option>
                        </select>
                    </div>

                    {selectedApplicantIds.length > 0 && (
                        <Button
                            onClick={() => {
                                const selectedObjs = sortedApplications.filter(a => selectedApplicantIds.includes(a._id));
                                openWhatsAppForCandidates(selectedObjs);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold px-3 py-1.5 flex items-center gap-1.5 shadow-sm"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            WhatsApp Selected ({selectedApplicantIds.length})
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={onTriggerAiScan}
                        disabled={isScanning || sortedApplications.length === 0}
                        variant="outline"
                        className="rounded-lg text-xs font-bold border-purple-200 text-purple-700 bg-purple-50/70 hover:bg-purple-100 flex items-center gap-1.5 transition-all"
                    >
                        <Sparkles className={`w-3.5 h-3.5 text-purple-600 ${isScanning ? 'animate-spin' : ''}`} />
                        {isScanning ? 'Scanning Resumes...' : 'Scan & Rank with AI'}
                    </Button>
                </div>
            </div>

            {/* Applicants Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white">
                <Table className="min-w-[900px]">
                    <TableCaption className="py-3 text-xs text-gray-500">
                        {sortedApplications.length} candidate(s) listed. Ranked by AI match score & resume criteria.
                    </TableCaption>
                    <TableHeader className="bg-gray-50/80">
                        <TableRow>
                            <TableHead className="w-10">
                                <input
                                    type="checkbox"
                                    checked={sortedApplications.length > 0 && selectedApplicantIds.length === sortedApplications.length}
                                    onChange={handleSelectAll}
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                                />
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
                            <TableHead className="font-semibold text-gray-700">AI Suitability Score</TableHead>
                            <TableHead className="font-semibold text-gray-700">Matching Skills</TableHead>
                            <TableHead className="font-semibold text-gray-700">Contact / Email</TableHead>
                            <TableHead className="font-semibold text-gray-700">Resume</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedApplications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                    No applicants found for this position yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedApplications.map((item) => {
                                const isChecked = selectedApplicantIds.includes(item._id);
                                const matchScore = item?.aiAnalysis?.matchScore;
                                const matchingSkills = item?.aiAnalysis?.matchingSkills || [];
                                const missingSkills = item?.aiAnalysis?.missingSkills || [];

                                return (
                                    <TableRow key={item._id} className={`hover:bg-purple-50/20 transition-colors ${isChecked ? 'bg-purple-50/30' : ''}`}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleToggleSelect(item._id)}
                                                className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                                            />
                                        </TableCell>
                                        <TableCell className="font-bold text-gray-900">
                                            <div>
                                                <span>{item?.applicant?.fullname}</span>
                                                <p className="text-[11px] text-gray-400 font-normal">
                                                    Applied: {item?.createdAt?.split("T")[0] || "N/A"}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getScoreBadge(matchScore)}
                                        </TableCell>
                                        <TableCell className="max-w-[220px]">
                                            <div className="flex flex-wrap gap-1">
                                                {matchingSkills.length > 0 ? (
                                                    matchingSkills.slice(0, 3).map((skill, sIdx) => (
                                                        <span
                                                            key={sIdx}
                                                            className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-100"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">
                                                        {(item?.applicant?.profile?.skills || []).join(", ") || "No skills listed"}
                                                    </span>
                                                )}
                                                {matchingSkills.length > 3 && (
                                                    <span className="text-[10px] text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded">
                                                        +{matchingSkills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-xs text-gray-600">
                                                <p>{item?.applicant?.email}</p>
                                                <p className="text-emerald-700 font-medium font-mono">
                                                    {item?.applicant?.phoneNumber ? `+91 ${item?.applicant?.phoneNumber}` : "No Phone"}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item?.applicant?.profile?.resume ? (
                                                <a
                                                    className="inline-flex items-center gap-1 text-[#6A38C2] font-semibold text-xs hover:underline"
                                                    href={item?.applicant?.profile?.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <span>{item?.applicant?.profile?.resumeOriginalName || "Resume"}</span>
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">N/A</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                                                    item?.status === 'accepted'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : item?.status === 'rejected'
                                                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}
                                            >
                                                {item?.status ? item.status.toUpperCase() : 'PENDING'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {/* Direct WhatsApp Button */}
                                                <Button
                                                    onClick={() => openWhatsAppForCandidates([item])}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                                    title="Direct WhatsApp Contact"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>

                                                {/* AI Insights & Actions Popover */}
                                                <Popover>
                                                    <PopoverTrigger className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-64 p-3 shadow-xl border-gray-100 rounded-2xl space-y-2">
                                                        {/* Candidate AI Brief */}
                                                        {item?.aiAnalysis?.summary && (
                                                            <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 text-xs">
                                                                <p className="font-bold text-purple-900 flex items-center gap-1 mb-1">
                                                                    <Sparkles className="w-3 h-3 text-purple-600" /> AI Resume Evaluation
                                                                </p>
                                                                <p className="text-purple-950 leading-tight text-[11px]">
                                                                    {item.aiAnalysis.summary}
                                                                </p>
                                                                {missingSkills.length > 0 && (
                                                                    <div className="mt-1.5 pt-1.5 border-t border-purple-200/50">
                                                                        <span className="font-semibold text-rose-700 text-[10px]">Missing Skills: </span>
                                                                        <span className="text-rose-900 text-[10px]">{missingSkills.join(", ")}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="pt-1">
                                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">Update Status</p>
                                                            {shortListingStatus.map((status, index) => (
                                                                <div
                                                                    onClick={() => statusHandler(status, item?._id)}
                                                                    key={index}
                                                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer hover:bg-gray-100 ${
                                                                        status === "Accepted" ? "text-emerald-600" : "text-rose-600"
                                                                    }`}
                                                                >
                                                                    {status === "Accepted" ? (
                                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                                    ) : (
                                                                        <XCircle className="w-3.5 h-3.5" />
                                                                    )}
                                                                    <span>Mark {status}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* WhatsApp Outreach Modal */}
            <WhatsAppModal
                isOpen={whatsAppModalOpen}
                onClose={() => setWhatsAppModalOpen(false)}
                selectedApplicants={whatsAppTargetCandidates}
                jobTitle={applicants?.title}
                companyName={applicants?.company?.name || "Company"}
            />
        </div>
    );
};

export default ApplicantsTable;
