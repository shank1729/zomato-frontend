import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";
function HomePage() {
  return (
    <>
    <main className="main-section container-fluid  bg-secondary ">
    <Wallpaper/>
    <QuickSearch/>
    </main>
    </>
  );
}

export default HomePage;