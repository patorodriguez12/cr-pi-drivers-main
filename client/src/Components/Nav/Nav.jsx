import styles from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";

export default function Nav(props) {
    return (
        <div>
            <SearchBar onSearch={props.onSearch} />
        </div>
    );
}