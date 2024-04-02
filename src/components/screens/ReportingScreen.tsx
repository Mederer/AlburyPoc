import { Container, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { Idea } from "../../types";
import styles from "./ReportingScreen.module.scss";

interface IdeaByStage {
  [key: string]: number;
  "testing": number;
  "development": number;
  "production": number;
}

function ReportingScreen() {
  const [ideas, setIdeas] = useState<Idea[] | null>(null);

  useEffect(() => {
    fetch("/api/IdeaManager")
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  if (ideas === null) {
    return <Container className={styles.loadingScreen}>
      <Spinner animation="border" />
    </Container>
  }

  const ideasByStage: IdeaByStage = ideas?.reduce((acc, idea) => {
    console.log(idea.stage)
    if (!acc[idea.stage.toLowerCase()]) {
      acc[idea.stage.toLowerCase()] = 0;
    }
    acc[idea.stage.toLowerCase()] = acc[idea.stage.toLowerCase()] + 1;
    return acc;
  }, {} as IdeaByStage) ?? { "testing": 0, "development": 0, "production": 0 };

  const data = {
    labels: Object.keys(ideasByStage).map(stage => stage[0].toUpperCase() + stage.slice(1)),
    datasets: [
      {
        label: 'Ideas by stage',
        data: Object.values(ideasByStage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Container>
    <h1>Reporting</h1>

    <Bar data={data} />
  </Container>
}

export default ReportingScreen;