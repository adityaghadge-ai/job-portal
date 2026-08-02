import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
      <Table className="min-w-[600px]">
        <TableCaption className="py-3 text-slate-400 text-xs">
          {allAppliedJobs.length <= 0 ? "You haven't applied to any jobs yet" : "A list of your recently applied jobs"}
        </TableCaption>
        <TableHeader className="bg-slate-950/80 border-b border-slate-800">
          <TableRow className="border-b border-slate-800 hover:bg-slate-900/80">
            <TableHead className="font-semibold text-slate-300">Date</TableHead>
            <TableHead className="font-semibold text-slate-300">Job Role</TableHead>
            <TableHead className="font-semibold text-slate-300">Company</TableHead>
            <TableHead className="text-right font-semibold text-slate-300">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow className="border-b border-slate-800/50">
              <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                <TableCell className="font-medium text-slate-400 text-xs">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="font-semibold text-white">{appliedJob?.job?.title || "N/A"}</TableCell>
                <TableCell className="text-slate-300">{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 font-bold rounded-xl border ${
                      appliedJob?.status === "rejected"
                        ? 'bg-red-950/50 text-red-400 border-red-800/50'
                        : appliedJob?.status === 'pending'
                        ? 'bg-amber-950/50 text-amber-400 border-amber-800/50'
                        : 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50'
                    }`}
                  >
                    {appliedJob?.status ? appliedJob.status.toUpperCase() : "PENDING"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable;
