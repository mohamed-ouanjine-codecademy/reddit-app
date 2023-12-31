import React from "react";
import styles from './PostTitle.module.css';

const PostTitle = ({ postTitleData }) => {
  const {
    title,
    link_flair_background_color,
    link_flair_richtext,
    link_flair_text_color,
    author,
  } = postTitleData;

  const colorTemplate = {
    dark: "black",
    light: "white",
  };

  return (
    <div className={styles.PostTitleContainer}>
      
      <h3 className={styles.title}>
        <span className={styles.author}>{author}</span>
        {title}
      </h3>

      {/* start of flair process */}
      {link_flair_richtext.length >= 1 && (
        // this is the flair container
        <div
          className={styles.flairContainer}
          style={{
            backgroundColor: `${link_flair_background_color}`,
          }}
        >
          {
            link_flair_richtext.map((element, index) => {
              if (element.e === "emoji") {
                return (
                  <div
                    key={index}
                    className={element.e}
                    title={element.a}
                    style={{
                      backgroundImage: `url(${element.u})`
                    }}
                  ></div>
                );
              } else if (element.e === "text") {
                return (
                  <span key={index} style={{ color: `${colorTemplate[link_flair_text_color]}`, }}>
                    {element.t}
                  </span>
                );
              }
              return null;
            })
          }
        </div>
      )}
    </div>
  );
}

export default PostTitle;