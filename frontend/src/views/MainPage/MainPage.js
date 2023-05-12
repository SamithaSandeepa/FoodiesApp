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

  // const upload = (event) => {
  //   let image = event.target.files[0];
  //   if (image == null || image === undefined) return;

  //   var uploadTask = storage.ref('images').child(image.name).put(image);
  //   uploadTask.on(
  //     'state_changed',
  //     function (snapshot) {
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setProgressBar(progress);
  //     },
  //     function (error) {},
  //     function () {
  //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         console.log(downloadURL);

  //         let payload = {
  //           postId: Math.floor(Math.random() * 100000).toString(),
  //           userId: JSON.parse(localStorage.getItem('users')).uid,
  //           postPath: downloadURL,
  //           caption: caption,
  //           timeStamp: new Date().getTime(),
  //           likeCount: 0,
  //         };

  //         const requestOptions = {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify(payload),
  //         };

  //         fetch('http://localhost:8080/post', requestOptions)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log(data);
  //             getPost();
  //           })
  //           .catch((error) => {});
  //       });
  //     }
  //   );
  // };

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
      {postArray.map((item, index) => (
        <Post
          key={index}
          id={item.id}
          userName={item.userName}
          imagePath={item.imagePath}
          caption={item.caption}
          likeCount={item.likeCount}
          userId={item.userId}
        />
      ))}
    </div>
  );
};

export default MainPage;
