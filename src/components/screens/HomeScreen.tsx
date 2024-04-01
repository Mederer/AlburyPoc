import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function HomeScreen() {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("/api/IdeaManager")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <Container>
            <h1>Home Screen</h1>
            <p>{data}</p>
        </Container>
    );
}

export default HomeScreen;