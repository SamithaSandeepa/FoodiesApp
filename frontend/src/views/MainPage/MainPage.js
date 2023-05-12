import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Post from "../../components/Post/Post";
// import uploadImage from '../../images/upload.png';
import { storage } from "../../firebase";
import AddPost from "../../components/Post/AddPost";

const MainPage = () => {
  const [postArray, setPostArray] = useState([]);
  const [progressBar, setProgressBar] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    const requestOptions = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    //API
    fetch("http://localhost:8080/api/posts/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPostArray(data);
      });
  };

  return (
    <div>
      <div className="mainpage__container" style={{ marginLeft: "-130px" }}>
        <div className="mainpage__divider"></div>
        <div className="fileupload">
          <label htmlFor="file-upload">
            <AddPost />
            {/* <img className="mainpage__uploadicon" src={uploadImage} alt="" /> */}
          </label>
          <input
            onChange={(e) => setCaption(e.target.value)}
            id="caption"
            type="text"
          />

          {/* <input onChange={upload} id="file-upload" type="file" /> */}
        </div>
        <div className="mainpage__divider"></div>
      </div>
      <div className="upload_text">{progressBar}</div>
      {postArray.map(
        (item, index) => (
          console.log(item, "item"),
          (
            <Post
              key={index}
              id={item.id}
              userName={item.userName}
              imagePath={item.imagePath}
              caption={item.caption}
              likeCount={item.likedBy}
              userId={item.userId}
            />
          )
        )
      )}
    </div>
  );
};

export default MainPage;
