import React from "react";
import ContentLoader from "react-content-loader";

const DialogueSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1500}
    height={100}
    viewBox="0 0 1500 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="18" width="1500" height="100" />
    <rect x="86" y="42" rx="0" ry="0" width="3" height="4" />
  </ContentLoader>
);

export default DialogueSkeleton;
