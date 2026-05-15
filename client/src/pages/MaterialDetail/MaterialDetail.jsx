import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  getMaterial,
  trackDownload,
  toggleBookmark,
  addRating,
  getRatings,
  addComment,
  getComments,
  deleteMaterial,
  resolveFileUrl,
} from "../../api";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import { Spinner } from "../../components";

import MaterialHeader from "../../components/MaterialDetail/MaterialHeader";

import DownloadActions from "../../components/MaterialDetail/DownloadActions";

import RatingSection from "../../components/MaterialDetail/RatingSection";

import CommentsSection from "../../components/MaterialDetail/CommentsSection";

import FileInfoCard from "../../components/MaterialDetail/FileInfoCard";

import ReviewsCard from "../../components/MaterialDetail/ReviewsCard";

import EmptyMaterial from "../../components/MaterialDetail/EmptyMaterial";

export default function MaterialDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const toast = useToast();

  const [material, setMaterial] = useState(null);

  const [ratings, setRatings] = useState([]);

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [stars, setStars] = useState(0);

  const [review, setReview] = useState("");

  const [comment, setComment] = useState("");

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);

    try {
      const [mData, rData, cData] = await Promise.all([
        getMaterial(id),
        getRatings(id),
        getComments(id),
      ]);

      setMaterial(mData.material);

      setRatings(rData.ratings);

      setComments(cData.comments);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await trackDownload(id);

      window.open(resolveFileUrl(material.fileUrl), "_blank");
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const handleBookmark = async () => {
    try {
      const d = await toggleBookmark(id);

      setBookmarked(d.bookmarked);

      toast(d.message);
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const handleRating = async () => {
    if (!stars) {
      toast("Please select a star rating.", "error");

      return;
    }

    try {
      await addRating(id, {
        stars,
        review,
      });

      toast("Rating submitted!");

      load();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
      toast("Comment cannot be empty.", "error");

      return;
    }

    try {
      await addComment(id, {
        content: comment,
      });

      setComment("");

      toast("Comment posted!");

      const d = await getComments(id);

      setComments(d.comments);
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this material? This cannot be undone.")) {
      return;
    }

    try {
      await deleteMaterial(id);

      toast("Material deleted.");

      navigate("/");
    } catch (err) {
      toast(err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  if (!material) {
    return <EmptyMaterial />;
  }

  const isOwner =
    user && (user._id === material.uploadedBy?._id || user.role === "admin");

  return (
    <div className="page">
      <div className="material-layout">
        {/* LEFT CONTENT */}
        <div className="material-main">
          <MaterialHeader
            material={material}
            isOwner={isOwner}
            handleDelete={handleDelete}
          />

          <DownloadActions
            user={user}
            bookmarked={bookmarked}
            handleDownload={handleDownload}
            handleBookmark={handleBookmark}
          />

          {user && (
            <RatingSection
              stars={stars}
              setStars={setStars}
              review={review}
              setReview={setReview}
              handleRating={handleRating}
            />
          )}

          <CommentsSection
            comments={comments}
            user={user}
            comment={comment}
            setComment={setComment}
            handleComment={handleComment}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="material-sidebar">
          <FileInfoCard material={material} />

          <ReviewsCard ratings={ratings} />
        </div>
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
      
      .material-layout {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 24px;
        align-items: start;
      }

      .material-main {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
      }

      .material-sidebar {
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: sticky;
        top: 90px;
      }

      /* TABLET */
      @media (max-width: 1024px) {

        .material-layout {
          grid-template-columns: 1fr;
        }

        .material-sidebar {
          position: static;
        }

      }

      /* MOBILE */
      @media (max-width: 768px) {

        .material-layout {
          gap: 18px;
        }

        .material-main {
          gap: 14px;
        }

      }

      /* SMALL MOBILE */
      @media (max-width: 480px) {

        .material-layout {
          gap: 14px;
        }

      }

    `}</style>
    </div>
  );
}
