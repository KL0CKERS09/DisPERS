"use client";

import { useEffect, useState } from "react";
import AnnouncementModal from "./AnnouncementModal"; // We'll create this next

const AnnouncementSection = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch("/api/announcement", {
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setAnnouncements(data.announcements || []);
            } catch (err) {
                console.error("FETCH ERROR:", err);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <section className="w-full flex justify-center">
            <div className="w-[80%] flex flex-col px-3 pb-5">
                <div className="title-holder">
                    <h1 className="text-3xl py-10 font-bold text-gray-800">
                        Community Announcement
                    </h1>
                </div>
                <div className="card-holder border-t border-gray-300 flex justify-center">
                    <ul className="w-[90%] py-10 space-y-6">
                        {announcements.length > 0 ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            announcements.map((t: any) => (
                                <li
                                    key={t._id}
                                    className="p-5 rounded-2xl shadow-lg hover:scale-[1.03] cursor-pointer transition-transform duration-300 bg-white"
                                    onClick={() => {
                                        setSelectedAnnouncement(t);
                                        setShowModal(true);
                                    }}
                                >
                                    <div className="main-info-card flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div className="date-status-container flex items-center gap-2">
                                                <span className="bg-[#36AE7C] py-1 px-4 rounded-full text-xs font-semibold text-white">
                                                    {t.type}
                                                </span>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(t.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            {/*<button
                                                className="bg-gray-200 hover:bg-[#fac39e] p-2 rounded-full hover:scale-110 transition"
                                                
                                            >
                                                <Image
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO3ZQQrCQBBE0e8JDdJDFvHsLgwKQW8QQQmM4MLsq5t6ILhM8SeQKJhJacATuAEDSR2AB/DunxUYSWr5GZJ6zKlffIkx8WfMCziTUHiMqHAZUeEyosJlRLmMKpdR5TKqSpUZd17OBoqMmSky5EoyJY5W27nZJxLxCBUuocIlVLiECpdQ4RIqmh8ARbQKJY5V/gydK4zY3CuM+B6t7UeCS/9uVtUHEhTs/ZXHkMQAAAAASUVORK5CYII="
                                                    height={20}
                                                    width={20}
                                                    alt="view icon"
                                                />
                                            </button>*/}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
                                        <p className="text-gray-700 truncate">{t.description}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No announcements found.</p>
                        )}
                    </ul>
                </div>
            </div>

            {showModal && selectedAnnouncement && (
                <AnnouncementModal
                    announcement={selectedAnnouncement}
                    onClose={() => setShowModal(false)}
                />
            )}
        </section>
    );
};

export default AnnouncementSection;
