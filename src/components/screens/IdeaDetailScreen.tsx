import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Idea } from "../../types";
import styles from "./IdeaDetailScreen.module.scss";

function IdeaDetailScreen() {
    const params = useParams();
    const [ideas, setIdeas] = useState<Idea[] | null>(null);

    useEffect(() => {
        fetch("/api/IdeaManager")
            .then((res) => res.json())
            .then((data) => setIdeas(data));
    }, [])

    if (!ideas) {
        return <Container className={styles.loadingScreen}>
            <Spinner animation="border" />
        </Container>
    }

    const idea = ideas.find(idea => idea.id === params.id);

    if (!idea) {
        return <Container>
            <h1>Idea not found</h1>
        </Container>
    }

    return (
        <Container>
            <h1>{idea.title}</h1>
            <p>{idea.stage}</p>
        </Container>
    );
}

export default IdeaDetailScreen;