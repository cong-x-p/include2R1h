import * as React from "react";
import Head from "next/head";
import WelcomePage from "./WelcomePage";

class App extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>2R1h&apos;s Site</title>
                </Head>
                <WelcomePage/>
            </div>
        );
    }
}

export default App;