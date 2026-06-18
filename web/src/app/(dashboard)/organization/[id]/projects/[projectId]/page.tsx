export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;

  return (
    <div>
      <div>
        Your project {projectId} in organization {id}
      </div>
    </div>
  );
}
