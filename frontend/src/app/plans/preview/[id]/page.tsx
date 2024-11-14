import React from 'react'
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SharePlanPage from './_components/SharePlanPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Podgląd planu"
}

export default async function SharePlan({ params }: PageProps) {
  const { id } = await params;
  if (!id || typeof id !== 'string' || id.length === 0) {
    return notFound()
  }

  return (
    <SharePlanPage planId={id} />
  )
}
