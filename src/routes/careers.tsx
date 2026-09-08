import { createFileRoute } from "@tanstack/react-router";
import Career from "../components/Career";

export const Route = createFileRoute("/careers")({ component: CareerPage });

function CareerPage() {
	return <Career />;
}
