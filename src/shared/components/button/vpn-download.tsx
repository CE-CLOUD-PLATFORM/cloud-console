'use client';
import { Button, SvgIcon } from '@mui/material';
import FileDownload03 from '@untitled-ui/icons-react/build/esm/FileDownload03';
import React from 'react';
import toast from 'react-hot-toast';

const BtnVPNDownload = () => {
    const handleDownloadVPN = async () => {
        try {
          const response = await fetch('/res/cloud.ovpn', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to download file');
          }
    
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
    
          const link = document.createElement('a');
          link.href = url;
          link.download = 'ce-cloud-vpn.ovpn';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
    
          toast.success('Download completed!');
        } catch (error) {
          console.log(error);
          toast.error('Download failed. Please try again.');
        } finally {
          // setLoading(false);
        }
      };
  return (
    <Button
        onClick={handleDownloadVPN}
        startIcon={
          <SvgIcon>
            <FileDownload03 />
          </SvgIcon>
        }
        variant="outlined"
      >
        VPN
      </Button>
  );
};

export default BtnVPNDownload;
