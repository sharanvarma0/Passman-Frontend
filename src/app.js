import Description from "./components/description";

// As the Description holds links to other components. That is the only component required for now. 
// Once more components are added which require dedicated routing, those components can be added here.
// When dedicated routes are added here, please do not forget to speficy the route in "index.js".

export default function App() {
    return (
        <div>
            <Description /><br /><br />
        </div>
    );
}
             

