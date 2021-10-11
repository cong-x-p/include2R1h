import * as React from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import styles from "./WelcomPage.module.css";

class WelcomePage extends React.Component {
    render() {
        return (
            <div>
                <Container maxWidth={"md"}>
                    <div className={styles.container}>
                        <Image
                            priority
                            className={styles.circleImg}
                            src="/images/me.png"
                            alt="me"
                            height={200}
                            width={200}
                        />
                    </div>
                    <div className={styles.Welcome}>
                        Welcome to my site
                    </div>
                    <div className={styles.littletips}>
                        <p>(╯▔▽▔)╯ plz do not go away that quickly<br/>read the passage below, maybe you will be insterested</p>
                    </div>
                    <div className={styles.self_descripton}>
                        I am Sebastian Cong by the way
                    </div>
                </Container>
            </div>
        )
    }
}

export default WelcomePage;