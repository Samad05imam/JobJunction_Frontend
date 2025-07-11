import React from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const ApplicantsTable = () => {
  const applicants = useSelector((store) => store.application.applicants || []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success('Status updated successfully');

      // 🔄 Optionally reload or refresh applicants state here if needed
      // dispatch(getApplicants(jobId)); <-- If you use Redux for refresh
    } catch (error) {
      console.error('Status update failed:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recently applied users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              No applicants found.
            </TableCell>
          </TableRow>
        ) : (
          applicants.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.applicant?.fullname || 'N/A'}</TableCell>
              <TableCell>{app.applicant?.email || 'N/A'}</TableCell>
              <TableCell>{app.applicant?.phoneNumber || 'N/A'}</TableCell>
              <TableCell>
                {app.applicant?.profile?.resume ? (
                  <a
                    href={app.applicant.profile.resume}
                    className="text-blue-600 cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 capitalize"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
