import React, { Suspense, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

const ProfileSettings = React.lazy(
  () => import("../components/ProfileSettings")
);

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button onClick={() => setShowSettings((p) => !p)}>
        {showSettings ? "Hide Settings" : "Show Settings"}
      </button>

      {showSettings && (
        <ErrorBoundary>
          <Suspense fallback={<div>Loading settings...</div>}>
            <ProfileSettings />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
