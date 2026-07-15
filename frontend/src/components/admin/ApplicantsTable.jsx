import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'

const ApplicantsTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of Applicants who applied to this company recently..</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full Name </TableHead>
                <TableHead>Email </TableHead>
                <TableHead>Contact </TableHead>
                <TableHead>Resume </TableHead>
                <TableHead className="text-right">Action </TableHead>
            </TableRow>
            
        </TableHeader>
      </Table>
    </div>
  )
}

export default ApplicantsTable
