import React, { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return <div className="main-wrap flex flex-col min-h-screen">{children}</div>;
}

export default MainLayout;
