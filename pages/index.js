import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import { BannerItem } from '../components/BannerItem';
import { ConnectMetamask } from '../components/ConnectMetamask';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { IdoInfo } from '../components/IdoInfo';
import { IdoPool } from '../components/IdoPool';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [ethAddress, setEthAddress] = useState('');
  const [connectionText, setConnectionText] = useState('');
  const [idos, setIdos] = useState({
    live: [],
    upcoming: [],
    completed: [
      // {
      //   name: 'CasperLabs',
      //   logo: 'https://casperlabs.io/assets/images/logos/logo-white-8a944e2693.svg',
      //   website: 'https://casperlabs.io/',
      //   twitter: 'https://twitter.com/Casper_Network',
      //   telegram: 'https://t.me/casperblockchain',
      //   status: 'COMPLETED',
      //   pair: 'ETH',
      //   description:
      //     'CasperLabs has partnered with dozens of international enterprises that are building solutions\
      //     on the Casper Network to accelerate their business operations and benefit from the opportunities\
      //     of blockchain technology.',
      //   progress: '100%',
      //   swapRate: '1 ETH',
      //   symbol: 'CSPR',
      //   supply: '1183959035',
      //   price: '440000.00',
      //   poolCap: '80000000',
      //   access: 'PRIVATE',
      //   participants: '937'
      // },
      // {
      //   name: 'Chia Network',
      //   logo: 'https://www.chia.net/img/chia_logo.svg',
      //   website: 'https://www.chia.net/',
      //   twitter: 'https://twitter.com/chia_project',
      //   telegram: '#',
      //   status: 'COMPLETED',
      //   pair: 'ETH',
      //   description:
      //     'A new blockchain and smart transaction platform that is easier to use, more efficient, and secure.',
      //   progress: '100%',
      //   swapRate: '1 ETH',
      //   symbol: 'XCH',
      //   supply: '21514760',
      //   price: '285000.00',
      //   poolCap: '34977272.7272727',
      //   access: 'PRIVATE',
      //   participants: '856'
      // },
      // {
      //   name: 'Paid Network',
      //   logo: 'https://paidnetwork.com/wp-content/uploads/2020/09/PAID-polkadot-full-1.png',
      //   website: 'https://paidnetwork.com/',
      //   twitter: 'https://twitter.com/paid_network',
      //   telegram: '#',
      //   status: 'COMPLETED',
      //   pair: 'ETH',
      //   description:
      //     ' PAID Network is an ecosystem DAPP that leverages blockchain technology to deliver\
      //     DeFi powered SMART Agreements to make business exponentially more efficient. We allow\
      //     users to create their own policy, to ensure they Get PAID.',
      //   progress: '100%',
      //   swapRate: '1Eth:',
      //   symbol: 'PAID',
      //   supply: '594717456',
      //   price: '28000.00',
      //   poolCap: '1800000',
      //   access: 'PRIVATE',
      //   participants: '667'
      // }
    ]
  });
  const [bannerItems, setBannerItems] = useState([
    {
      url: 'https://techcrunch.com/wp-content/uploads/2018/03/chia-crypto-logo.png?w=680'
    },
    {
      url: 'https://paidnetwork.com/wp-content/uploads/2021/01/PAID-polkadot-full-1.png'
    },
    {
      url: 'https://cdn-scaliomcms-prod.s3-us-west-1.amazonaws.com/casperlabs/casper-card.jpg'
    }
  ]);
  const [selectedPool, setSelectedPool] = useState({});
  useEffect(() => {
    const getIdos = async () => {
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_FORWARDER_ORIGIN}/api/idos`
      });
      const idoData = {
        live: [],
        upcoming: [],
        completed: []
      };
      for (const ido of response.data) {
        if (ido.status === 'LIVE') {
          idoData.live.push(ido);
        } else if (ido.status === 'UPCOMING') {
          idoData.upcoming.push(ido);
        } else {
          idoData.completed.push(ido);
        }
      }
      setIdos(idoData);
    };
    getIdos();
  }, []);
  return (
    <div className={styles.container}>
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
        ) : (Object.keys(selectedPool).length === 0 ? (
          <section className={styles.pools}>
            <div className={styles.banner}>
              <Carousel indicators={true}>
                {bannerItems.map(bannerItem => {
                  return <BannerItem item={bannerItem} key={bannerItem.url} />;
                })}
              </Carousel>
            </div>
            <h4>Live IDOs</h4>
            <div className={styles.liveIdos}>
              <div className={styles.container}>
                <div className={idos.live.length > 0 ? styles.row : undefined}>
                  {idos.live.length === 0 ? (
                    <p className={styles.noIdoText}>There are no live IDOs</p>
                  ) : (
                    idos.live.map(pool => {
                      return (
                        <IdoPool
                          key={pool.name}
                          pool={pool}
                          setSelectedPool={setSelectedPool}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <h4>Upcoming IDOs</h4>
            <div className={styles.upComingIdos}>
              <div className={styles.container}>
                <div
                  className={idos.upcoming.length > 0 ? styles.row : undefined}
                >
                  {idos.upcoming.length === 0 ? (
                    <p className={styles.noIdoText}>
                      There are no upcoming IDOs
                    </p>
                  ) : (
                    idos.upcoming.map(pool => {
                      return (
                        <IdoPool
                          key={pool.name}
                          pool={pool}
                          setSelectedPool={setSelectedPool}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <h4>Completed IDOs</h4>
            <div className={styles.completedIdos}>
              <div className={styles.container}>
                <div
                  className={idos.completed.length > 0 ? styles.row : undefined}
                >
                  {idos.completed.length === 0 ? (
                    <p className={styles.noIdoText}>
                      There are no completed IDOs
                    </p>
                  ) : (
                    idos.completed.map(pool => {
                      return (
                        <IdoPool
                          key={pool.name}
                          pool={pool}
                          setSelectedPool={setSelectedPool}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.ido}>
            <IdoInfo pool={selectedPool} setSelectedPool={setSelectedPool} />
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
