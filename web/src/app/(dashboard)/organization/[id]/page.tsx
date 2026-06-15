import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>page: {id}</div>;
}

export default page;
