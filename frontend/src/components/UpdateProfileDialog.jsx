import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Camera, Upload, User as UserIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { Avatar, AvatarImage } from "./ui/avatar";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
        profilePhotoFile: null
    });

    const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || "");
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const resumeChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
        }
    };

    const photoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilePhotoFile: file });
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // First update profile photo if selected
            if (input.profilePhotoFile) {
                const photoData = new FormData();
                photoData.append("file", input.profilePhotoFile);
                const photoRes = await axios.post(`${USER_API_END_POINT}/profile/update`, photoData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                });
                if (photoRes.data.success) {
                    dispatch(setUser(photoRes.data.user));
                }
            }

            // Next update other fields and/or resume
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills);
            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success("Profile updated successfully!");
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-[#0f172a] text-slate-100 rounded-2xl border border-slate-800 shadow-2xl sm:max-w-[500px] p-6 max-h-[90vh] overflow-y-auto" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-extrabold text-white flex items-center gap-2">
                        <span>Edit Profile</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4 my-2">
                    {/* Profile Picture Upload Section */}
                    <div className="flex flex-col items-center justify-center space-y-3 pb-2 border-b border-slate-800">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-2 border-[#8b5cf6] shadow-lg shadow-purple-500/20">
                                <AvatarImage src={photoPreview} alt={input.fullname} />
                            </Avatar>
                            <label
                                htmlFor="photo-upload"
                                className="absolute bottom-0 right-0 p-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full cursor-pointer shadow-md transition-all duration-200 hover:scale-110"
                            >
                                <Camera className="w-4 h-4" />
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={photoChangeHandler}
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-slate-400">Click camera icon to change profile picture</p>
                    </div>

                    <div>
                        <Label htmlFor="fullname" className="text-xs font-semibold text-slate-300">Full Name</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="mt-1 bg-slate-900 border-slate-800 text-slate-100 rounded-xl focus-visible:ring-[#8b5cf6]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="mt-1 bg-slate-900 border-slate-800 text-slate-100 rounded-xl focus-visible:ring-[#8b5cf6]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-300">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="mt-1 bg-slate-900 border-slate-800 text-slate-100 rounded-xl focus-visible:ring-[#8b5cf6]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="bio" className="text-xs font-semibold text-slate-300">Bio</Label>
                        <Input
                            id="bio"
                            name="bio"
                            type="text"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="Tell us about yourself..."
                            className="mt-1 bg-slate-900 border-slate-800 text-slate-100 rounded-xl focus-visible:ring-[#8b5cf6]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="skills" className="text-xs font-semibold text-slate-300">Skills (comma separated)</Label>
                        <Input
                            id="skills"
                            name="skills"
                            type="text"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="HTML, CSS, React, Node.js"
                            className="mt-1 bg-slate-900 border-slate-800 text-slate-100 rounded-xl focus-visible:ring-[#8b5cf6]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="resume" className="text-xs font-semibold text-slate-300">Resume PDF</Label>
                        <Input
                            id="resume"
                            name="resume"
                            type="file"
                            accept="application/pdf"
                            onChange={resumeChangeHandler}
                            className="mt-1 text-xs cursor-pointer rounded-xl bg-slate-900 border-slate-800 text-slate-300"
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        {loading ? (
                            <Button disabled className="w-full rounded-xl bg-[#8b5cf6] text-white">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating Profile...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-200"
                            >
                                Save Changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
