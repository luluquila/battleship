import FleetBoat from './FleetBoat';

function FleetContainer({boatFleet}) {
    const boatFleetMap = boatFleet.map((boat) => {
        const classNameOfBoat = `boat-${boat.boatSize}`;
        return <FleetBoat key={boat.boatId} classNameOfBoat={classNameOfBoat} style={boat.isSunk ? {opacity:1.0} : {opacity:0.0}} />;
    });

    return (
        <div className="fleet-container">
            {boatFleetMap}
        </div>
    );

}

export default FleetContainer;