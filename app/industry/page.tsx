"use client";
import Model from "@/components/Model"

export default function ModelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Model View</h1>
      <Model />
    </div>
  )
}
