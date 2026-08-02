import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
            <Table className="min-w-[700px]">
                <TableCaption className="py-3">A list of applicants who applied to this job posting</TableCaption>
                <TableHeader className="bg-gray-50/80">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Email</TableHead>
                        <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-700">Resume</TableHead>
                        <TableHead className="font-semibold text-gray-700">Applied Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!applicants || applicants?.applications?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                No applicants found for this position yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-50/50">
                                <TableCell className="font-semibold text-gray-900">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="inline-flex items-center gap-1 text-[#6A38C2] font-semibold hover:underline"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>{item?.applicant?.profile?.resumeOriginalName || "Resume"}</span>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-600">{item?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-1 rounded-lg hover:bg-gray-100">
                                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-2 shadow-lg border-gray-100 rounded-xl space-y-1">
                                            {shortListingStatus.map((status, index) => (
                                                <div
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    key={index}
                                                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-gray-100 ${
                                                        status === "Accepted" ? "text-green-600" : "text-red-600"
                                                    }`}
                                                >
                                                    {status === "Accepted" ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4" />
                                                    )}
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
