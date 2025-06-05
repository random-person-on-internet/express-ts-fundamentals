import React from "react";

type Overlay = { id: string; label: string };

const VideoOverlay = React.memo(({ overlays }: { overlays: Overlay[] }) => {
  return (
    <div>
      {overlays.map((o) => (
        <span key={o.id}> {o.label}</span>
      ))}
    </div>
  );
});

export default VideoOverlay;
