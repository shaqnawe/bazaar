import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Alert, Button, Modal, ProgressBar } from "react-bootstrap";
import { useData } from "../contexts/DataProvider";
import { Heading } from '@chakra-ui/react';

const ListProducts = () => {
  let imageLoc;
  const descRef = useRef();
  const nameRef = useRef();
  const typeRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const storage = getStorage();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgLocation, setImgLocation] = useState();
  const { addProductInfo } = useData();
  //   Modal config
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      imageLoc = reader.result;
      console.log(imageLoc);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const imageUploadHandler = (e) => {
    e.preventDefault();
    const selectedImage = e.target[0].files[0];
    setFile(selectedImage);
    uploadFile(selectedImage);
  };
  const uploadFile = (file) => {
    if (!file) {
      setError("Please upload atleast one image file");
      return;
    }
    setLoading(true);
    const storageRef = ref(storage, `/productImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const transferred =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(transferred);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setImgLocation(url)
        );
        setLoading(false);
        // console.log(imgLocation)
      }
    );
  };

  const productInfoHandler = (e) => {
    e.preventDefault();
    const prodName = nameRef.current.value;
    const prodDesc = descRef.current.value;
    const prodType = typeRef.current.value;
    const prodPrice = priceRef.current.value;
    const prodCat = categoryRef.current.value;
    // console.log(prodName, prodDesc, prodType, prodPrice, prodCat, imgLocation);
    let data = {
      name: prodName,
      description: prodDesc,
      image: imgLocation,
      category: prodCat,
      price: prodPrice,
      type: prodType,
    };
    console.log(data);
    addProductInfo(data);
    document.getElementById("prod-info").reset();
  };

  return (
    <Fragment>
      <Heading mt={4}>
        <span id="sell-header" className="container mt-3">
          List Item
        </span>
      </Heading>
      {loading && <ProgressBar variant="info" now={progress} />}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex justify-content-center mb-4">
        <form id="prod-info" onSubmit={(e) => productInfoHandler(e)}>
          <div className="form-group">
            <div>
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                ref={nameRef}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <input
                className="form-control"
                type="textarea"
                ref={descRef}
                required
              />
            </div>
            <div>
              <label>Type</label>
              <input
                className="form-control"
                type="text"
                ref={typeRef}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                className="form-control"
                type="text"
                ref={priceRef}
                required
              />
            </div>
            <div>
              <label>Category</label>
              <input
                className="form-control"
                type="text"
                ref={categoryRef}
                required
              />
            </div>
          </div>
          <button id="info-adder" type="submit" className="btn">
            Add Information
          </button>
        </form>
      </div>
      <form onSubmit={(e) => imageUploadHandler(e)}>
        <div className="d-flex justify-content-center">
          <input type="file" id="fileUpload" />
          <button id="upload" type="submit" className="btn">
            Upload
          </button>
        </div>
      </form>
      <div>
        {values.map((v, idx) => (
          <Button
            key={idx}
            id="preview-img"
            className="mt-4"
            onClick={() => handleShow(v)}
          >
            Preview Image
            {typeof v === "string" && `below ${v.split("-")[0]}`}
          </Button>
        ))}
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{file?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {imageLoc && (
              <img id="image-preview " src={imageLoc} alt="preview" />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};
export default ListProducts;
