import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="App">
      <header>
        <h1 className="heading-text">Let me tell you something</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
} 
