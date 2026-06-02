import { Component, type ReactNode } from "react";

import { useLocation } from "react-router-dom";
import Error404 from "./error-404";
import Error500 from "./error-500";

interface Props {
	children?: ReactNode;
}

interface State {
	error: string;
	hasError: boolean;
}

function ErrorBoundary(props: Props) {
	const { pathname } = useLocation();
	return <ErrorBoundaryClass key={pathname} {...props} />;
}

class ErrorBoundaryClass extends Component<Props, State> {
	public state: State = {
		error: "",
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		console.error("ERROR_BOUNDARY", error);
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error.message };
	}

	public render() {
		if (!this.state.hasError) return this.props.children;

		if (["404", "404-DOI"].includes(this.state.error)) {
			return <Error404 error={this.state.error} />;
		}
		if (this.state.error !== "500") {
			return <Error500 error={this.state.error} />;
		}
	}
}

export default ErrorBoundary;
