import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    setShowToast,
    updatePost,
  } = useContext(PostContext);

  // const [updatedPost, setUpdatedPost] = useState(post);
  const [updatedPost, setUpdatedPost] = useState(
    post || {
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    }
  );
  useEffect(() => {
    // Cập nhật updatedPost khi modal được mở và post có giá trị
    if (showUpdatePostModal && post) {
      setUpdatedPost(post);
    }
  }, [post, showUpdatePostModal]);

  const { title, description, url, status } = updatedPost;
  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  const closeDialog = () => {
    // setUpdatedPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowUpdatePostModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    // console.log(message)
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
    setShowUpdatePostModal(false);
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title=help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>

              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
