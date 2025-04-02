import { Button, SvgIcon } from '@mui/material';
import { AlignBottom01 } from '@untitled-ui/icons-react';
import React from 'react';

export const CsvDownloadBtn = () => {
  const handleDownloadCSV = () => {
    const link = document.createElement('a');
    link.href = '/assets/files/template.csv'; // เส้นทางจาก public folder
    link.download = 'template.csv'; // ตั้งชื่อไฟล์ตอนโหลด
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownloadCSV}
      startIcon={
        <SvgIcon>
          <AlignBottom01 />
        </SvgIcon>
      }
      variant="outlined"
    >
      Download
    </Button>
  );
};
