import Header from './Header';

function HeaderZonderRefresh({ gebruiker, children }) {
  return (
    <>
      <Header gebruiker={gebruiker} />
      <main className='h-[90%]'>{children}</main>
    </>
  );
}

export default HeaderZonderRefresh;