import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { MessageSquare, Send, User, CheckCircle2, Copy, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const MESSAGE_TEMPLATES = [
    {
        id: 'interview',
        title: '🎯 Interview Invitation',
        template: `Hi {name}, we reviewed your application for the {jobTitle} role at {companyName}. We are impressed with your profile and would like to invite you for an interview. Please let us know your available time slots!`
    },
    {
        id: 'shortlist',
        title: '🎉 Shortlisted Notification',
        template: `Hi {name}, congratulations! Your profile has been shortlisted for the {jobTitle} position at {companyName}. Our team will connect with you soon for the next steps.`
    },
    {
        id: 'info_request',
        title: '📋 Portfolio & Info Request',
        template: `Hi {name}, regarding your application for {jobTitle} at {companyName}, could you please share your updated portfolio or GitHub link with us? Thanks!`
    },
    {
        id: 'custom',
        title: '✏️ Custom Message',
        template: `Hi {name}, reaching out regarding your application for {jobTitle} at {companyName}. `
    }
];

const WhatsAppModal = ({ isOpen, onClose, selectedApplicants = [], jobTitle = "the position", companyName = "our company" }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('interview');
    const [customMessage, setCustomMessage] = useState('');
    const [activeCandidateIndex, setActiveCandidateIndex] = useState(0);

    const activeCandidate = selectedApplicants[activeCandidateIndex] || selectedApplicants[0];

    useEffect(() => {
        if (activeCandidate) {
            const tmpl = MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate)?.template || MESSAGE_TEMPLATES[0].template;
            const filled = tmpl
                .replace(/{name}/g, activeCandidate?.applicant?.fullname || "Candidate")
                .replace(/{jobTitle}/g, jobTitle)
                .replace(/{companyName}/g, companyName);
            setCustomMessage(filled);
        }
    }, [selectedTemplate, activeCandidateIndex, selectedApplicants, jobTitle, companyName]);

    const handleSelectTemplate = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return null;
        let cleaned = String(phone).replace(/\D/g, '');
        if (cleaned.length === 10) {
            cleaned = '91' + cleaned; // default country code for 10-digit Indian numbers
        }
        return cleaned;
    };

    const handleSendWhatsApp = () => {
        const phone = formatPhoneNumber(activeCandidate?.applicant?.phoneNumber);
        if (!phone) {
            toast.error("Candidate phone number is missing or invalid.");
            return;
        }

        const encodedMsg = encodeURIComponent(customMessage);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
        window.open(whatsappUrl, '_blank');
        toast.success(`Opening WhatsApp chat with ${activeCandidate?.applicant?.fullname || 'Student'}!`);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(customMessage);
        toast.success("Predefined message copied to clipboard!");
    };

    if (!isOpen || selectedApplicants.length === 0) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] p-6 rounded-2xl bg-white shadow-2xl">
                <DialogHeader className="pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <MessageSquare className="w-6 h-6" />
                        <DialogTitle className="text-xl font-bold text-gray-900">Direct WhatsApp Contact</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-500 text-xs sm:text-sm mt-1">
                        Send predefined or customized WhatsApp messages directly to candidates.
                    </DialogDescription>
                </DialogHeader>

                {/* Candidate Selection Tabs if multiple */}
                {selectedApplicants.length > 1 && (
                    <div className="py-2">
                        <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                            Selecting Candidate ({activeCandidateIndex + 1} of {selectedApplicants.length}):
                        </Label>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {selectedApplicants.map((app, idx) => (
                                <button
                                    key={app._id || idx}
                                    onClick={() => setActiveCandidateIndex(idx)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                                        activeCandidateIndex === idx
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold'
                                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span>{app?.applicant?.fullname || `Candidate ${idx+1}`}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4 py-2">
                    {/* Predefined Template Selector */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-2 block">Choose Predefined Message Template:</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {MESSAGE_TEMPLATES.map((tmpl) => (
                                <button
                                    key={tmpl.id}
                                    onClick={() => handleSelectTemplate(tmpl.id)}
                                    className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                                        selectedTemplate === tmpl.id
                                            ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 shadow-sm'
                                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                                    }`}
                                >
                                    <span>{tmpl.title}</span>
                                    {selectedTemplate === tmpl.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Target Recipient Info */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Recipient Student</p>
                            <p className="text-sm font-bold text-gray-800">{activeCandidate?.applicant?.fullname}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 font-medium">WhatsApp Contact</p>
                            <p className="text-sm font-mono font-semibold text-emerald-600">
                                {activeCandidate?.applicant?.phoneNumber ? `+${formatPhoneNumber(activeCandidate?.applicant?.phoneNumber)}` : "No Phone"}
                            </p>
                        </div>
                    </div>

                    {/* Predefined Message Editable Box */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs font-semibold text-gray-700">Predefined WhatsApp Message:</Label>
                            <button
                                onClick={copyToClipboard}
                                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                            >
                                <Copy className="w-3 h-3" /> Copy Text
                            </button>
                        </div>
                        <Textarea
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            rows={4}
                            className="w-full text-sm rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 p-3 leading-relaxed"
                            placeholder="Type your WhatsApp message..."
                        />
                    </div>
                </div>

                <DialogFooter className="pt-3 border-t border-gray-100 flex sm:flex-row justify-between items-center gap-2">
                    <Button variant="outline" onClick={onClose} className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Exit & Go Back
                    </Button>
                    <Button
                        onClick={handleSendWhatsApp}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2 font-semibold shadow-md shadow-emerald-100 px-5"
                    >
                        <Send className="w-4 h-4" /> Send via WhatsApp
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WhatsAppModal;
