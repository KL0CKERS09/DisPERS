"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./alert.module.scss";
import UserAlertModal from "./userAlertModal";

type Alert = {
  _id: string;
  title: string;
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  img: string;
  createdAt: string;
};

export default function ActiveAlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/alerts", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setAlerts(data.alerts || []);
        } else {
          console.error("Failed to fetch alerts");
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading alerts...</div>;
  }

  return (
    <div className="w-[90%] min-h-screen mx-auto flex">
      {/*<div className="w-[30%] mt-20">
          <h1 className="font-bold text-2xl">Navigate To:</h1>
          <ul className="py-5">
            <li className="flex gap-2 py-4">
              <Image width={24} height={24} src="https://img.icons8.com/material-outlined/24/graph-report.png" alt="Submit Report" />
              <Link href="../user-submit-report" className="hover:underline">Submit Report</Link>
            </li>
            <li className="flex gap-2 py-4 pl-2 bg-[#F3775C] rounded-2xl">
              <Image width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUklEQVR4nO2VQUrDUBRFo2BnFaEDxT3oTAU3YItzXYS4BR0U0R0IVneiIK3VoThQwc5snduqw3rkwRPD89cm+fnBQQ8Ewn3kHvKTn0TRhP8MsAn0gC5QK1Lc5YfnIoQLQJ3fSDYfSroN9BmNzLZCSIeMZ5haDkwDbTlMvjjmTi2v8khMRxu4EodLXNMLOyY/ID1109HRvOoSn+pwz+R3GcS3pmNf84ZL/KjDFZN/ZBC/m45Vze9d4jcdlk2eCdNR1njgEg90OBtAPKdx3yV+sEsNTGUVy7WxnrW/lrphXy6g4iGuOF6uE5e4arcTsOwhXor1PGm2MeoDIpu8Gct2PcQ7sZ5L6XV+QFwAFx7i80QSi+69T/xYj9IAzAA3+HMtXWnEx+THWVKp/EnyppVE3AogbiZe7gnfAC+OpexFoQGOHOLDIsQllcudyyHnpeDivPgCzPrCBp1O8i0AAAAASUVORK5CYII=" alt="alarm"/>
              <Link href="/user-alert" className="hover:underline text-white">Alerts</Link>
            </li>
            <li className="flex gap-2 py-4">
              <Image width={24} height={24} src="https://img.icons8.com/material-outlined/24/commercial.png" alt="Announcements" />
              <Link href="/announcements" className="hover:underline">Announcements</Link>
            </li>
          </ul>
        </div>*/}
      <section className="second-container w-[100%] flex justify-center ">
        <div className="alert-container w-[100%] flex flex-col pl-[3em]">
          <div className="title-holder border-b border-gray-300 mb-5">
            <h1 className="text-3xl py-10 font-bold text-gray-800">
              Alerts
            </h1>
          </div>

          <div className="w-full">
            <ul
              className={`${style.shadowInner} alert-grid-container w-full  
                  ${expanded ? `h-fit overflow-visible ${style.hideBefore}` : "max-h-[500px] overflow-hidden"} 
                  ${style.resizingGrid} gap-5 transition-all duration-300 ease-in-out`}
            >
              {alerts.length > 0 ? (
                alerts.map((t) => (
                  <li
                    className={`${style[`li-indiv`]} max-w-[300px] bg-white grid grid-rows-2 rounded-2xl overflow-hidden hover:scale-[1.05] transition-[500ms]`}
                    key={t._id}
                  >
                    <div className="report-image-holder w-full bg-blue-400 min-h-full max-h-full overflow-hidden">
                      <Image
                        src={t.img}
                        alt={t.title}
                        width={300}
                        height={200}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="w-[100%] py-1 grid grid-rows-3">
                      <div className="report-title-holder w-full px-4 py-3 flex items-center">
                        <h1 className="text-black text-xl font-bold">{t.title}</h1>
                      </div>
                      <div className="report-descrip-holder w-full px-4 py-3 max-h-[2em] overflow-hidden">
                        <Link href="/" className="text-[#000]/50 text-xs">
                          {t.description}
                        </Link>
                      </div>
                      <div className="w-full px-4 py-3 flex justify-between items-center">
                        <label className="text-xs text-[#c0c0c0]">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </label>
                        <button
                          onClick={() => setSelectedAlert(t)}
                          className="w-[6em] h-[2.25em] bg-white text-[#2563EB] text-[.9rem] rounded-xl underline hover:cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No alerts found.</p>
              )}
            </ul>
          </div>

          {/* See More Button */}
          {alerts.length > 0 && (
            <div className="alert-show-more">
              <div className="show-more-btn-holder w-[100%] flex justify-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`transition-transform cursor-pointer duration-300 flex flex-col items-center ${style['button']}`}
                >
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBElEQVR4nO2WOw7CQAwFcwkQnNaFny8GVRA0UHAcKKBCipLd9U/CU8fSjtZJZpqKoiiKQhFmPgG4EtF+SgYR7Zn5BuC8+jCAC4AXMz8yydBH4vE927w6ICI7APfvwBPA0eWkDWciokPXYKSM9EpkkpFRiQwyoiURKSPaEhEyYiXhKSPWEh4ybhKWMu4SFjJhEpoyphLcEI0//dPUZj2zZBmNAwcamZlNVqZlpmedxDMat8y4SljJhEhoy4RKaL7MHh8Dl5sJvQlNmTQSo2sWuk5LVDQuUNGYZc3Cb8Lipxku4RWNrlhFYwja0RiKVjSmYDQaU9EbjSlpjcbUbI3GoiiK/+INpVdbjree1BIAAAAASUVORK5CYII="
                    alt="Show more"
                    width={30}
                    height={30}
                    className={`hover:scale-[1.1] transition-transform duration-300 ${style[`expandBtn`]} ${expanded ? "rotate-180" : "rotate-0"}`}
                  />
                  <span className={`${style['span']} text-gray-600 hover:font-bold cursor-pointer`}>
                    {expanded ? "See Less" : "See More"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Alert Modal */}
        <UserAlertModal
          isOpen={!!selectedAlert}
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      </section>

    </div>

  );
}
