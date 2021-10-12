import * as React from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import styles from "../styles/WelcomPage.module.css";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

class WelcomePage extends React.Component {
    render() {
        return (
            <div>
                <Container maxWidth={"md"}>
                    <div className={styles.container}>
                        <Image
                            priority
                            className={styles.circleImg}
                            src="/me.PNG"
                            alt="me"
                            height={200}
                            width={200}
                        />
                    </div>
                    <div className={styles.Welcome}>
                        Welcome to my site（*′▽`）
                    </div>
                    <div className={styles.littletips}>
                        <p>(╯▔▽▔)╯ plz do not go away that quickly<br/>read the passage below, maybe you will be
                            insterested</p>
                    </div>
                    <div className={styles.self_descripton}>
                        My name is Sebastian Cong and I am new to web programming. In fact, this is my first attempt to
                        go live with a web application that is still being perfected. I did my undergrad at Beijing
                        Institute of Technology and will soon go to the Institute of Computing Technology at the
                        University of Chinese Academy of Sciences for my master&apos;s degree. I&apos;ll be posting
                        things on this
                        site that I think are cool. Also I will leave my github address below and this project will be
                        open source. Thank you very much for reading this, and it would be great if you could go to
                        github and star my project.
                    </div>
                    <div className={styles.buttonGroup}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" href={"https://github.com/cong-x-p"}>
                                My Github Page
                            </Button>
                            <Link href={"/SignIn"}>
                                <Button variant="contained" endIcon={<SendIcon/>}>
                                    This is for my own
                                </Button>
                            </Link>
                        </Stack>
                    </div>
                    <div className={styles.webInfo}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" href="https://www.2R1h.me/">
                                https://www.2R1h.me
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </div>
                </Container>
            </div>
        )
    }
}

export default WelcomePage;