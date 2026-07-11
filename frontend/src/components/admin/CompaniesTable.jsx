import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>
            A List of Your recent registered companies 
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead> Logo</TableHead>
                <TableHead> Name </TableHead>
                <TableHead> Date </TableHead>
                <TableHead className="text-right"> Action  </TableHead>
                

            </TableRow>
        </TableHeader>
        <TableBody>
<TableCell>
    <Avatar>
        <AvatarImage src="https://thfvnext.bing.com/th/id/OIP.zPZ5iEhi91xrNkVh7cS0WwHaHa?w=205&h=205&c=7&r=0&o=7&cb=thfvnextfalcon3&pid=1.7&rm=3"/>
    </Avatar>
</TableCell>
<TableCell>Company Name</TableCell>
<TableCell>11-07-2026</TableCell>
<TableCell className="text-right cursor-pointer">
    <Popover>
        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
    <PopoverContent className="w-32">
<div className="flex items-center gap-2 w-fit cursor-pointer">
    <Edit2 className="w-4"/>
    <span>Edit </span>
</div>
    </PopoverContent>
    </Popover>
</TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
