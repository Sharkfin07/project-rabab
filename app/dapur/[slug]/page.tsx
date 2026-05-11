type Props = { params: Promise<{ slug: string }> };

export default async function KulinerDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Kuliner: {slug}</h1>
    </main>
  );
}
