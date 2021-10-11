import * as React from "react";
import * as ReactDOM from "react-dom";
import SignIn from "./SignIn/SignIn";
import Head from "next/head";
import WelcomePage from "./WelcomePage/WelcomePage";

class App extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Site of 2R1h</title>
                </Head>
                <WelcomePage/>
            </div>
        );
    }
}

export default App;