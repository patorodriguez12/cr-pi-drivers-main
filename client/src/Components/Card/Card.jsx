
export default function Card(props) {
    return (
        <div>
            <div>
                <button onClick={props.onClose}>X</button>
            </div>
            <div>
                <h2>{props.name.forename}</h2>
                <h4>{props.name.surename}</h4>
                <h4>{props.nationality}</h4>
                <h4>{props.dob}</h4>
            </div>
            <img src={props.image} />
        </div>
    );
}