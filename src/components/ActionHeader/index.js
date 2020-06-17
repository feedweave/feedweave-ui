import React from "react";
import { Link } from "@reach/router";

import { formatDate } from "../../util";

import UserIcon from "../UserIcon";

import newPostIcon from "./new-post-icon.png";
import likeIcon from "./like-icon.png";
import replyIcon from "./reply-icon.svg";

import styles from "./index.module.css";

function ActionHeaderTemplate({ main, controls }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerMain}>{main}</div>
      {controls ? (
        <div className={styles.headerControls}>{controls}</div>
      ) : null}
    </div>
  );
}

function UserDetails({ user }) {
  const { id: userId, arweaveId } = user;
  const userName = arweaveId ? `@${arweaveId}` : userId.substr(0, 8) + "...";
  return (
    <>
      <div className={styles.headerAvatar}>
        <Link to={`/user/${userId}`}>
          <UserIcon size="22px" user={user} />
        </Link>
      </div>
      <div className={styles.headerUser}>
        <Link to={`/user/${userId}`}>{userName}</Link>
      </div>
    </>
  );
}

function NewPostSignifier({ tx: { id } }) {
  return (
    <>
      <img
        className={styles.headerActionIcon}
        alt="new-post-icon"
        src={newPostIcon}
      />
      <div className={styles.headerAction}>
        <Link to={`/post/${id}`}>New Post</Link>
      </div>
    </>
  );
}

function SocialControls() {
  const likeCount = 5;
  const replyCount = 2;
  return (
    <div className={styles.headerSocial}>
      <div className={styles.headerCountReply}>
        <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
        <div>{replyCount}</div>
      </div>
      <div className={styles.headerCountLike}>
        <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
        <div>{likeCount}</div>
      </div>
    </div>
  );
}

function TransactionMetadata({ tx }) {
  const { id: txId, timestamp } = tx;

  const formattedTimestamp = formatDate(timestamp);
  return (
    <>
      <div className={styles.headerTimestamp}>{formattedTimestamp}</div>
      <div className={styles.headerHash}>
        <a href={`https://explorer.arweave.co/transaction/${txId}`}>
          {txId.substr(0, 9) + "..."}
        </a>
      </div>
    </>
  );
}

export function PostActionHeader({ tx, user }) {
  const main = (
    <div className={styles.headerMainContainer}>
      <div className={styles.headerMainLeft}>
        <UserDetails user={user} />
        <NewPostSignifier tx={tx} />
      </div>
      <div className={styles.headerMainRight}>
        <TransactionMetadata tx={tx} />
      </div>
    </div>
  );

  const controls = <SocialControls />;

  return <ActionHeaderTemplate main={main} controls={controls} />;
}

// function PostDetailHeader({ tx, user }) {
//   const main = (
//     <div className={styles.headerMainContainer}>
//       <div className={styles.headerMainLeft}>
//         <div className={styles.headerAvatar}>
//           <Link to={`/user/${userId}`}>
//             <UserIcon size="22px" user={user} />
//           </Link>
//         </div>
//         <div className={styles.headerUser}>
//           <Link to={`/user/${userId}`}>{userName}</Link>
//         </div>
//         <img
//           className={styles.headerActionIcon}
//           alt="new-post-icon"
//           src={newPostIcon}
//         />
//         <div className={styles.headerAction}>
//           <Link to={`/post/${txId}`}>New Post</Link>
//         </div>
//       </div>
//       <div className={styles.headerMainRight}>
//         <div className={styles.headerTimestamp}>{formattedTimestamp}</div>
//         <div className={styles.headerHash}>
//           <a href={`https://explorer.arweave.co/transaction/${txId}`}>
//             {txId.substr(0, 9) + "..."}
//           </a>
//         </div>
//       </div>
//     </div>
//   );

//   const controls = (
//     <div className={styles.headerSocial}>
//       <div className={styles.headerCountReply}>
//         <img className={styles.replyIcon} alt="reply-icon" src={replyIcon} />
//         <div>{replyCount}</div>
//       </div>
//       <div className={styles.headerCountLike}>
//         <img className={styles.likeIcon} alt="like-icon" src={likeIcon} />
//         <div>{likeCount}</div>
//       </div>
//     </div>
//   );
//   return <ActionHeaderTemplate main={main} controls={controls} />;
// }
