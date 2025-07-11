import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs = [], searchJobByText = '' } = useSelector(store => store.job);
    const navigate = useNavigate();

    // ✅ Use useMemo instead of useEffect + setState
    const filteredJobs = useMemo(() => {
        if (!searchJobByText) return allAdminJobs;

        const text = searchJobByText.toLowerCase();
        return allAdminJobs.filter(job =>
            job?.title?.toLowerCase().includes(text) ||
            job?.company?.name?.toLowerCase().includes(text)
        );
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of recently added jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Not a single Job has been registered!
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name || 'N/A'}</TableCell>
                                <TableCell>{job?.title || 'N/A'}</TableCell>
                                <TableCell>{job?.createdAt?.slice(0, 10) || 'N/A'}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                className="flex items-center gap-4 w-fit cursor-pointer"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-4 w-fit cursor-pointer"
                                            >
                                                <Eye className="w-4" />
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
    );
};

export default AdminJobsTable;
