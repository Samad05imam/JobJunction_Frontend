import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact2, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const haveResume = user?.profile?.resume;
    // const downloadUrl = user?.profile?.resume?.replace('/upload/', '/upload/fl_attachment/');
    const downloadUrl = user?.profile?.resume

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-18 w-18">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl '>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right hover:bg-amber-50 my-auto' variant='outline'>
                        <Pen />
                    </Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-3'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-3'>
                        <Contact2 />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    {Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 ? (
                        <div className='flex items-center gap-2 flex-wrap'>
                            {user.profile.skills.map((item, index) => (
                                <Badge key={index} className='bg-gray-300 border border-gray-800 gap-4'>
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <span>NA</span>
                    )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='text-medium font-bold'>Resume</Label>
                    {haveResume ? (
                        <a
                            href={downloadUrl}
                            download
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {user?.profile?.resumeOriginalName || "Download Resume"}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>

            </div>

            <div className='max-w-4xl mx-auto rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
