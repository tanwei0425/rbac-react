import React from "react";
import QueueAnim from "rc-queue-anim";
import styles from "./index.module.less";

const Index = props => {
    return (
        <div className={styles["meteor-shower"]}>
            <div className={styles["meteor-shower-bg"]}>
                <div className={styles["meteor-shower-bg-info"]}>
                    {[
                        { top: `10%`, left: `100%`, animationDelay: `4s` },
                        { top: `20%`, left: `90%`, animationDelay: `3s` },
                        { top: `30%`, left: `80%`, animationDelay: `2s` },
                        { top: `40%`, left: `70%`, animationDelay: `1s` },
                        { top: `50%`, left: `60%`, animationDelay: `2s` },
                        { top: `40%`, left: `50%`, animationDelay: `3s` },
                        { top: `30%`, left: `40%`, animationDelay: `4s` },
                        { top: `20%`, left: `30%`, animationDelay: `3s` },
                        { top: `10%`, left: `40%`, animationDelay: `2s` },
                        { top: `20%`, left: `50%`, animationDelay: `1s` }
                    ].map((e, i) =>
                        <div
                            key={`meteor${i}`}
                            draggable={false}
                            className={styles['meteor-shower-bg-info-rain']}
                            style={e}
                        />
                    )}
                </div>
            </div>
            <QueueAnim
                type="left"
                animConfig={{
                    duration: 1000,
                    ease: `linear`,
                    opacity: [1, 0]
                }}
            >
                {props.children}
            </QueueAnim>
        </div>
    );
};

export default Index;

