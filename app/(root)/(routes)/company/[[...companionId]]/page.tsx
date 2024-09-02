interface CompanionIdPageProps {
  searchParams: {
    companionId: string;
  };
}

const CompanionIdPage = ({ searchParams }: CompanionIdPageProps) => {
  const { companionId } = searchParams;

  return (
    <main>
      <h1>{companionId}</h1>
      <div></div>
    </main>
  );
};

export default CompanionIdPage;
