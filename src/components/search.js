import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";

function Search() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/weather/${query}`);
        }
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Enter city"
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
        </Form>
    );
}

export default Search;