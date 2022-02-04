import { Button } from "antd";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

function Qrgenerator() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const classes = useStyles();
  const qrRef = useRef(null);
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  useEffect(() => {
    setText(
      `{"url":"http://www.google.com","campsiteId":"61e7f07b6037b7f2d038b932"}`
    );
  }, []);

  return (
    <>
      <h1>QR Generator</h1>
      <div className="HpQrcode"></div>
      <Button type="primary" onClick={() => generateQrCode()}>
        Generate
      </Button>
      <br />
      {imageUrl ? (
        <a href={imageUrl} download>
          <img src={imageUrl} alt="img" />
        </a>
      ) : null}
      <br />
      Click on Qr code to save
    </>
  );
}
export default Qrgenerator;
