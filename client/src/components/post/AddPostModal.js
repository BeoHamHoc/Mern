import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost,setShowToast } =
    useContext(PostContext);
  const closeDialog = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = newPost;
  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    closeDialog();
    console.log(message)
    setShowToast({show: true, message, type : success ? 'success': 'danger'})
  };
  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
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
              onChange={onChangeNewPostForm}
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
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
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

export default AddPostModal;
