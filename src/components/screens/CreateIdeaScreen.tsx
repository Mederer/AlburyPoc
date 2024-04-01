import { FormEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";

function CreateIdeaScreen() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('testing');


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !description || !stage) {
            alert('Please fill all fields');
            return;
        }

        const idea = {
            title,
            description,
            stage
        }

        try {
            const response = await fetch('/api/IdeaManager', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(idea)
            });

            if (response.ok) {
                alert('Idea created successfully');
                setTitle('');
                setDescription('');
                setStage('testing');
            } else {
                alert('Failed to create idea');
            }
        } catch (error) {
            alert('Failed to create idea');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stage</Form.Label>
                    <Form.Select value={stage} onChange={e => setStage(e.target.value)} >
                        <option value="testing">Testing</option>
                        <option value="development">Development</option>
                        <option value="complete">Complete</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="submit" value="Create" />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CreateIdeaScreen;