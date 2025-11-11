import React from "react";
type MemberchatPageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function page({ params }: MemberchatPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return <div>
      
       </div>;
}

export default page;
