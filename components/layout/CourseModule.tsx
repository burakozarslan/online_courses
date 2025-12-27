"use client";

import { Check, ChevronDown, Play } from "lucide-react";
import type { Module } from "@/courses";

interface CourseModuleProps {
  module: Module;
}

export default function CourseModule({ module }: CourseModuleProps) {
  return (
    <div
      key={module.id}
      className="mb-6 bg-neutral-0 border border-neutral-200 shadow-sm"
    >
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-brand-100 text-brand-600 flex items-center justify-center rounded-full">
            <Check className="w-3 h-3" />
          </div>
          <div>
            <span className="text-caption text-neutral-500 block">
              MODULE 0{module.no}
            </span>
            <h3 className="text-heading-3 text-neutral-900">{module.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-caption text-neutral-500">4/4 Completed</span>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* <!-- Lesson List --> */}
      <div className="divide-y divide-neutral-100">
        {/* <!-- Lesson 1 --> */}
        <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
          <div className="pt-1">
            <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
              <Check className="w-3 h-3" />
            </div>
          </div>
          {/* <!-- Thumbnail --> */}
          <div className="w-32 h-20 bg-neutral-900 relative shrink-0 border border-neutral-200 group-hover:border-neutral-400 transition-colors">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-6 h-6 text-white opacity-50" />
            </div>
            <span className="absolute bottom-1 right-1 bg-neutral-900 text-white text-[10px] px-1">
              10:24
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-body font-medium text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
              Initializing Next.js 14
            </h4>
            <p className="text-caption text-neutral-500 line-clamp-1">
              Setting up the app router, typescript, and tailwind configuration.
            </p>
          </div>
          <div className="flex items-center">
            <button className="text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
              Replay
            </button>
          </div>
        </div>
        {/* <!-- Lesson 2 --> */}
        <div className="p-4 flex gap-4 hover:bg-neutral-50 transition-colors group">
          <div className="pt-1">
            <div className="w-5 h-5 border-2 border-brand-500 bg-brand-500 flex items-center justify-center text-white">
              <Check className="w-3 h-3" />
            </div>
          </div>
          <div className="w-32 h-20 bg-neutral-900 relative shrink-0 border border-neutral-200 group-hover:border-neutral-400 transition-colors">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-6 h-6 text-white opacity-50" />
            </div>
            <span className="absolute bottom-1 right-1 bg-neutral-900 text-white text-[10px] px-1">
              08:15
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-body font-medium text-neutral-900 mb-1 group-hover:text-brand-600 transition-colors">
              Database Schema with Prisma
            </h4>
            <p className="text-caption text-neutral-500 line-clamp-1">
              Modeling User, Products, and Orders in PostgreSQL.
            </p>
          </div>
          <div className="flex items-center">
            <button className="text-caption text-neutral-400 hover:text-neutral-900 px-3 py-1 border border-neutral-200">
              Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
