import React from "react";

import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Window from "../components/window";

const Help: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Window title="Ayuda">
            <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate numquam laboriosam
                illum dignissimos
                dolorum delectus exercitationem praesentium, asperiores, dolore rem maxime et voluptas
                sapiente sit,
                earum
                placeat impedit nobis aut amet officiis perferendis eveniet. Similique nesciunt ipsam
                sapiente quidem in
                consectetur officia, vitae magni quis ea minima sunt ullam labore eveniet iste dolorem
                repudiandae
                distinctio vero optio assumenda eligendi praesentium consequuntur nisi. Repellendus
                error ut eaque ad.
                Inventore facere ducimus assumenda minus delectus animi accusantium quam blanditiis hic
                quod
                reprehenderit
                beatae quae, porro quaerat dicta, nesciunt rem dolor totam? Veritatis perspiciatis ab
                rerum adipisci,
                iusto
                ratione labore inventore dolore modi, pariatur temporibus impedit quia in quibusdam
                nulla ipsa fugiat
                deleniti voluptate nostrum, veniam dignissimos commodi. Corporis similique voluptas
                cumque cum quasi
                eius
                eaque deleniti excepturi quae. Fuga aperiam nulla distinctio quisquam ducimus aliquid,
                impedit explicabo
                dolor ipsam necessitatibus accusamus cumque officiis numquam sequi asperiores neque
                nemo, officia qui
                eligendi? Voluptatibus architecto assumenda dolor at. Enim vitae doloribus amet
                obcaecati corporis,
                harum
                quasi aliquam corrupti repellat, beatae quos quis! Esse perferendis quasi repellendus
                sint, labore quod
                quibusdam cumque iusto voluptates. Error sequi ab fugiat quibusdam saepe delectus atque
                mollitia beatae
                ducimus dignissimos ipsum labore deleniti ipsam, soluta odio nisi distinctio reiciendis?
            </span>

            <br/>

            <Card.Footer>
                <Button onClick={() => navigate(-1)}>Volver Atr&aacute;s</Button>
            </Card.Footer>
            </Window>
    );
};

export default Help;