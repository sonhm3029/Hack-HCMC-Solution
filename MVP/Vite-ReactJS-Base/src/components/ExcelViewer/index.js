import React from "react";

const ExcelViewer = ({ fileUrl }) => {
  return (
    <iframe
      src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
        fileUrl
      )}`}
      width="100%"
      height="600px"
      frameBorder="0"
    />
  );
};

export default ExcelViewer;
