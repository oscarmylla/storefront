export default function Layout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <div className="py-7 md:py-10 container">{children}</div>
    </>
  );
}
