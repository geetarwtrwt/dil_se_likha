"use client";
import { UseAppContext } from "@/app/AuthContext";
import React from "react";

export default function Page() {
  let { contactData } = UseAppContext();
  return (
    <section className="w-full py-16 pt-28">
      {contactData.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="text-left font-bold md:text-xl border-b border-gray-200">
              <th className="py-4">Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="py-4">
            {contactData.map((e) => {
              return (
                <tr key={e._id} className="border-b border-gray-200">
                  <td className="py-2">{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.message}</td>
                  <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full text-2xl">
          <p className="text-center font-bold">No Data Found</p>
        </div>
      )}
    </section>
  );
}
