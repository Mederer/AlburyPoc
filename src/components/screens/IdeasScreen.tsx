import { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { Idea } from "../../types";
import styles from "./HomeScreen.module.scss";
import { useNavigate } from "react-router-dom";

function ViewIdeasScreen() {
    const [data, setData] = useState<Idea[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/IdeaManager")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    if (data === null) {
        return <Container className={styles.loadingScreen}>
            <Spinner animation="border" />
        </Container>
    }

    const handleNavigate = (to: string) => {
        navigate(to);
    }

    return (
        <Container>
            <div className={styles.ideaGrid}>
                {data?.map((idea) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{idea.title}</Card.Title>
                            <Card.Text>
                                {idea.stage}
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleNavigate(`/ideas/${idea.id}`)}>Details</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default ViewIdeasScreen;