import { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { Idea } from "../../types";
import styles from "./HomeScreen.module.scss";

function HomeScreen() {
    const [data, setData] = useState<Idea[] | null>(null);

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
                            <Button variant="primary">Details</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default HomeScreen;