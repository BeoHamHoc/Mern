import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import Spinner from "react-bootstrap/esm/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/post/SinglePost";
import AddPostModal from "../components/post/AddPostModal";
// import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import CardBody from "react-bootstrap/esm/CardBody";
import UpdatePostModal from "../components/post/UpdatePostModal";

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Get all post
  useEffect(() => {
    getPosts();
  }, []);
  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center">
          <Card.Header as="h1">Hi {username},</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIT</Card.Title>
            <Card.Text>
              Click the button below to track your first skill
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIT!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* // ADD POST Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" height={50} width={50} />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />

      {post !== null && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "10%", right: "2%" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          type: null,
          message: "",
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong> {message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
