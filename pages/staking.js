import HistoryIcon from '@material-ui/icons/History';
import Head from 'next/head';
import React, { useState } from 'react';

import { ConnectMetamask } from '../components/ConnectMetamask';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import styles from '../styles/Staking.module.css';

export default function Staking() {
  const [ethAddress, setEthAddress] = useState('');
  const [connectionText, setConnectionText] = useState('');
  return (
    <div>
      <Head>
        <title>Crypto Excellence</title>
        <meta name="description" content="Crypto Excellence" />
        <link rel="icon" href="/cefavicon.png" />
      </Head>
      <video
        playsInline
        autoPlay
        muted
        loop
        id="bgvid"
        className={styles.video}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>
      <Header
        ethAddress={ethAddress}
        setEthAddress={setEthAddress}
        setConnectionText={setConnectionText}
      />
      <main className={styles.main}>
        {ethAddress === '' ? (
          <section className={styles.wrapper}>
            <ConnectMetamask
              ethAddress={ethAddress}
              setEthAddress={setEthAddress}
              connectionText={connectionText}
              setConnectionText={setConnectionText}
            />
          </section>
        ) : (
          <section className={styles.container}>
            <div className={styles.userStakingInfo}>
              <div className={styles.userTier}>
                <p>
                  Current staking APY: <span>20%</span>
                </p>
                <p>
                  Accumulated staking yield: <span>0.0 CE</span>
                </p>
                <p>
                  Validated staked amount: <span>0.0 CE</span>
                </p>
              </div>
              <div className={styles.stakingHistory}>
                <h4>Total staked amount</h4>
                <h5>0.0 CE</h5>
                <div className={styles.history}>
                  <HistoryIcon />
                  <i> No staking history</i>
                </div>
                <button>Withdraw</button>
              </div>
            </div>
            <section className={styles.bottom}>
              <div className={styles.stake}>
                <div className={styles.stakeHeader}>
                  <h5>Stake Now</h5>
                </div>
                <div className={styles.stakeBody}>
                  <h5>How much do you want to stake</h5>
                  <div className={styles.stakeInput}>
                    <div className={styles.left}>
                      <span>
                        <h3>Stake</h3>
                      </span>
                      <input type="number" placeholder="stake" />
                    </div>
                    <div className={styles.right}>
                      <h3>Balance: 0.0</h3>
                      <div>
                        <button>MAX</button>
                        <h5>CE</h5>
                      </div>
                    </div>
                  </div>
                  <button className={styles.confirmButton}>Confirm</button>
                </div>
              </div>
              <div className={styles.tiersInfoContainer}>
                <div className={styles.tiersInfo}>
                  <h5>Access exclusive projects in the tiers</h5>
                  <p>
                    Crypto Excellence has 4 tiers where candidates are investing
                    in promising projects with exclusive terms.
                  </p>
                  <div className={styles.tiers}>
                    <div>
                      <img src="/professor.png" alt="professor" />
                      <p>1.Professor</p>
                    </div>
                    <div>
                      <img src="/doctorate.jpg" alt="doctorate" />
                      <p>2.Doctorate</p>
                    </div>
                    <div>
                      <img src="/graduate.jpeg" alt="graduate" />
                      <p>3.Graduate</p>
                    </div>
                    <div>
                      <img src="/student.png" alt="student" />
                      <p>4.Student</p>
                    </div>
                  </div>
                  <button>LEARN MORE</button>
                </div>
              </div>
            </section>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
