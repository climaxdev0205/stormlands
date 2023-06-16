import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@layout/Header";
import Sidenav from "@layout/Sidenav";
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import store from "../redux/store";
import { Provider } from "react-redux";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Amplify, Analytics, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import AuthContext from "../context/AuthContext";
import Head from "next/head";

import toast, { Toaster } from "react-hot-toast";
import { Authenticator } from "@aws-amplify/ui-react";

Analytics.autoTrack('session', {
    provider: 'AWSPinpoint',
    enable: true,
    immediate: true,
    type: 'SPA'
});

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <BasicLayout>
            <Component></Component>
        </BasicLayout>
    );
}

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user.attributes.email);
    
            Analytics.record({
                name: 'userSignIn',
                immediate: true,
                attributes: { 'email': user.attributes.email },
            });
    
        });
    }, []);

    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        Router.events.on("routeChangeStart", handleRouteStart);

        Router.events.on("routeChangeComplete", handleRouteDone);

        Router.events.on("routeChangeError", handleRouteDone);

        return () => {
            // remove the event handler on unmount
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, []);

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <AuthContext>
                    <Provider store={store}>
                        <div className="flex-wrap">
                            <Head>
                                <link rel="icon" href="/assets/favicon.ico" />
                            </Head>
                            <Header signOut={signOut}></Header>
                            <Toaster
                                toastOptions={{
                                    style: {
                                        left: '100px'
                                    }
                                }}
                            ></Toaster>
                            <Sidenav></Sidenav>
                            <div className="sidenavindent headerindent">
                                <main>{children}</main>
                            </div>
                        </div>
                    </Provider>
                </AuthContext>
            )}
        </Authenticator>
    );
};

export default MyApp;
