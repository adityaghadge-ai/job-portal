import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return (
              job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
              job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
            <Table className="min-w-[600px]">
                <TableCaption className="py-3">A list of your recently posted jobs</TableCaption>
                <TableHeader className="bg-gray-50/80">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Role</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date Posted</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                No jobs posted matching your criteria.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50/50">
                                <TableCell className="font-semibold text-gray-900">{job?.company?.name || "N/A"}</TableCell>
                                <TableCell className="font-medium text-gray-700">{job?.title}</TableCell>
                                <TableCell className="text-gray-600">{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="p-1 rounded-lg hover:bg-gray-100">
                                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-2 shadow-lg border-gray-100 rounded-xl space-y-1">
                                            <div onClick={() => navigate(`/admin/jobs/create`)} className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer'>
                                                <Edit2 className='w-4 h-4 text-[#6A38C2]' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer'>
                                                <Eye className='w-4 h-4 text-blue-600' />
                                                <span>Applicants</span>
                                            </div>
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

export default AdminJobsTable;