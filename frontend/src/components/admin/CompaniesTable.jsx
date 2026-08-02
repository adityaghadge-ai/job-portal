import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
      <Table className="min-w-[500px]">
        <TableCaption className="py-3">A list of your registered companies</TableCaption>

        <TableHeader className="bg-gray-50/80">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Logo</TableHead>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Date Created</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No companies registered yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id || company.id || company.name} className="hover:bg-gray-50/50">
                <TableCell>
                  <Avatar className="h-10 w-10 border border-gray-100">
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>

                <TableCell className="font-semibold text-gray-900">{company.name}</TableCell>

                <TableCell className="text-gray-600">{company.createdAt?.split("T")[0] || "N/A"}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-1 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2 shadow-lg border-gray-100 rounded-xl">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 text-[#6A38C2]" />
                        <span>Edit</span>
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
  );
};

export default CompaniesTable;
