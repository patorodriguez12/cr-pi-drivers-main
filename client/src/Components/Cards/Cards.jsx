import Card from '../Card/Card'

export default function Cards(props) {
    const { drivers } = props;

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            {drivers.map(driver => (
                <Card 
                    key={driver.id}
                    forename={driver.name.forename}
                    surename={driver.name.surename}
                    image={driver.image}
                    nationality={driver.nationality}
                    dob={driver.dob}
                    onClose={() => props.onClose(driver.id)}
                />
            ))};
        </div>
    );
}