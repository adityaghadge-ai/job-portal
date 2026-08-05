import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, CheckCircle2, AlertCircle, Lightbulb, Bot, RefreshCw, ArrowLeft } from 'lucide-react';

const AIResumeScannerModal = ({ isOpen, onClose, analysis, jobTitle, isLoading, onReScan }) => {
    if (!isOpen) return null;

    const matchScore = analysis?.matchScore || 0;

    const getScoreColor = (score) => {
        if (score >= 80) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', ring: 'stroke-emerald-500' };
        if (score >= 50) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', ring: 'stroke-amber-500' };
        return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', ring: 'stroke-rose-500' };
    };

    const colorStyle = getScoreColor(matchScore);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-6 rounded-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-[#7209b7]">
                        <Bot className="w-6 h-6" />
                        <DialogTitle className="text-xl font-extrabold text-gray-900">AI Resume Suitability Scanner</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-500 text-xs sm:text-sm mt-1">
                        Real-time AI analysis evaluating your resume & profile match for <span className="font-semibold text-gray-800">{jobTitle || "this role"}</span>.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-semibold text-purple-700 animate-pulse flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Analyzing your resume skills & experience using AI...
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5 py-3">
                        {/* Score Header Card */}
                        <div className={`p-4 rounded-2xl border ${colorStyle.border} ${colorStyle.bg} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                            <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-inner border border-gray-100 font-extrabold text-2xl text-gray-900">
                                    <span>{matchScore}%</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Badge className={`${colorStyle.bg} ${colorStyle.text} border ${colorStyle.border} font-bold px-2.5 py-0.5 text-xs`}>
                                            {matchScore >= 80 ? "High Match" : matchScore >= 50 ? "Moderate Match" : "Low Match"}
                                        </Badge>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-base mt-1">Suitability Score</h3>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        Based on resume requirements & skill overlap
                                    </p>
                                </div>
                            </div>
                            {onReScan && (
                                <Button
                                    onClick={onReScan}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1.5 text-xs"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> Re-Scan
                                </Button>
                            )}
                        </div>

                        {/* AI Summary */}
                        <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100">
                            <div className="flex items-center gap-2 text-purple-800 font-bold text-sm mb-1.5">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                <span>AI Executive Insights</span>
                            </div>
                            <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
                                {analysis?.summary || "Your resume has been scanned against job requirements."}
                            </p>
                        </div>

                        {/* Skills Breakdown Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Matching Skills */}
                            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Matching Skills ({analysis?.matchingSkills?.length || 0})</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {analysis?.matchingSkills && analysis.matchingSkills.length > 0 ? (
                                        analysis.matchingSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-emerald-100/80 text-emerald-900 font-semibold text-xs px-2.5 py-1 rounded-lg border border-emerald-200"
                                            >
                                                ✓ {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500 italic">No specific matching skills found in bio/profile.</p>
                                    )}
                                </div>
                            </div>

                            {/* Missing / Gap Skills */}
                            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm mb-3">
                                    <AlertCircle className="w-4 h-4 text-rose-600" />
                                    <span>Skill Gaps ({analysis?.missingSkills?.length || 0})</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {analysis?.missingSkills && analysis.missingSkills.length > 0 ? (
                                        analysis.missingSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-rose-100/80 text-rose-900 font-semibold text-xs px-2.5 py-1 rounded-lg border border-rose-200"
                                            >
                                                ! {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-emerald-600 font-semibold">Great job! All target requirements are met.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations List */}
                        {analysis?.recommendations && analysis.recommendations.length > 0 && (
                            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                    <span>AI Recommendations to Boost Match Score</span>
                                </div>
                                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-amber-950 leading-relaxed">
                                    {analysis.recommendations.map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter className="pt-3 border-t border-gray-100 flex sm:flex-row justify-end items-center gap-2">
                    <Button onClick={onClose} variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold px-5 py-2 flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Exit & Go Back
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AIResumeScannerModal;
